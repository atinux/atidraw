export default eventHandler(async (event) => {
  // Make sure the user is authenticated to upload
  const { user } = await requireUserSession(event)

  // Check last image author
  const { blobs } = await hubBlob().list({ limit: 1 })
  if (blobs.length) {
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

  // Create a new pathname to be smaller than the last one uploaded
  // So the blob listing will send the last uploaded image at first
  // We use the timestamp in 2050 minus the current timestamp
  // So this project will start to be buggy in 2050, sorry for that
  const pathname = `${new Date('2050-01-01').getTime() - Date.now()}.jpg`

  return hubBlob().put(pathname, drawing, {
    addRandomSuffix: true,
    customMetadata: {
      userProvider: user.provider,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userUrl: user.url,
    },
  })
})
