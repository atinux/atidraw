export default eventHandler(async (event) => {
  // Make sure the user is authenticated to upload
  const { user } = await requireUserSession(event)

  // Check last image author
  const { blobs } = await hubBlob().list({
    prefix: 'drawings/',
    limit: 1,
  })
  if (!import.meta.dev && blobs.length) {
    const [lastDrawing] = blobs
    if (lastDrawing.customMetadata?.userId === user.id) {
      throw createError({
        statusCode: 400,
        message: 'You cannot upload two drawings in a row. Please wait for someone else to draw an image.',
      })
    }
  }

  // useUpload send a formData
  const form = await readFormData(event)
  const drawing = form.get('drawing') as File

  ensureBlob(drawing, {
    maxSize: '1MB',
    types: ['image/jpeg'],
  })

  // Ask LLaVA to describe the drawing
  const { description } = await hubAI().run('@cf/llava-hf/llava-1.5-7b-hf', {
    prompt: 'Describe this drawing in one sentence.',
    image: [...new Uint8Array(await drawing.arrayBuffer())],
  }).catch(() => {
    return { description: '' }
  })

  if (description.includes('penis')) {
    throw createError({
      statusCode: 400,
      message: 'You cannot upload drawings with TEUB.',
    })
  }

  // Create a new pathname to be smaller than the last one uploaded
  // So the blob listing will send the last uploaded image at first
  // We use the timestamp in 2050 minus the current timestamp
  // So this project will start to be buggy in 2050, sorry for that
  const name = `${new Date('2050-01-01').getTime() - Date.now()}`

  // Generate an image with AI
  const aiImage = await hubAI().run('@cf/runwayml/stable-diffusion-v1-5-img2img', {
    prompt: description || 'A drawing',
    guidance: 8,
    strength: 0.75,
    image: [...new Uint8Array(await drawing.arrayBuffer())],
  })
    .then((blob: Blob | Uint8Array) => {
      if (blob instanceof Uint8Array) {
        blob = new Blob([blob])
      }
      // If black image, skip
      if (blob.size === 842) {
        return null
      }
      return hubBlob().put(`${name}.png`, blob, {
        prefix: 'ai/',
        addRandomSuffix: true,
        contentType: 'image/png',
      })
    })
    .catch(() => null)

  return hubBlob().put(`${name}.jpg`, drawing, {
    prefix: 'drawings/',
    addRandomSuffix: true,
    customMetadata: {
      userProvider: user.provider,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userUrl: user.url,
      description: description.trim(),
      aiImage: aiImage ? aiImage.pathname : '',
    },
  })
})
