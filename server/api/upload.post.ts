import { generateText } from "ai"

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
  const drawingArrayBuffer = await drawing.arrayBuffer()

  ensureBlob(drawing, {
    maxSize: '1MB',
    types: ['image/jpeg'],
  })

  // Ask LLaVA to describe the drawing
  // Describe the drawing
  const { text } = await generateText({
    model: hubAI('openai/gpt-5-nano'),
    prompt: [{
      role: 'user',
      content: 'Describe this drawing in one sentence.',
    }, {
      role: 'user',
      content: [{
        type: 'image',
        image: drawingArrayBuffer,
      }],
    }],
  }).catch(() => {
    return { text: '' }
  })

  if (text.includes('penis')) {
    throw createError({
      statusCode: 400,
      message: 'You cannot upload this kind of drawings.',
    })
  }

  // Create a new pathname to be smaller than the last one uploaded
  // So the blob listing will send the last uploaded image at first
  // We use the timestamp in 2050 minus the current timestamp
  // So this project will start to be buggy in 2050, sorry for that
  const name = `${new Date('2050-01-01').getTime() - Date.now()}`

  // Generate an image with AI
  const aiImage = await generateText({
    model: hubAI('google/gemini-2.5-flash-image-preview'),
    providerOptions: {
      google: { responseModalities: ['TEXT', 'IMAGE'] },
    },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Generate a more detailed and beautiful image of the following drawing. Please generate the image in jpg, a 1:1 aspect ratio, as light as possible in term of size and 512x512px.',
          },
          {
            type: 'image',
            image: drawingArrayBuffer,
          }
        ],
      },
    ],
  }).then((result) => {
    const generatedImage = result.files[0]
    return hubBlob().put(`${name}.${generatedImage.mediaType.split('/')[1]}`, generatedImage.uint8Array, {
      prefix: 'ai/',
      addRandomSuffix: true,
      contentType: generatedImage.mediaType,
    })
  }).catch(() => null)

  return hubBlob().put(`${name}.jpg`, drawing, {
    prefix: 'drawings/',
    addRandomSuffix: true,
    customMetadata: {
      userProvider: user.provider,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userUrl: user.url,
      description: text.trim(),
      aiImage: aiImage ? aiImage.pathname : '',
    },
  })
})
