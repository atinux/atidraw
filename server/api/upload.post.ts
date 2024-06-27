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
        message: 'You cannot upload two drawings in a row. Please wait for someone else to draw an image.'
      })
    }
  }

  return hubBlob().handleUpload(event, {
    ensure: {
      types: ['image/jpeg'],
      maxSize: '1MB',
    },
    put: {
      addRandomSuffix: true,
      customMetadata: {
        userProvider: user.provider,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        userUrl: user.url,
      }
    }
  })
})
