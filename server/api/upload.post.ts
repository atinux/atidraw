export default eventHandler(async (event) => {
  // Make sure the user is authenticated to upload
  const { user } = await requireUserSession(event)

  return hubBlob().handleUpload(event, {
    types: ['image/jpeg'],
    maxSize: '1MB',
    // prefix: `${user.provider}/${user.id}`,
    // Store user dertails in metatada
    userProvider: user.provider,
    userId: user.id,
    userName: user.name,
    userAvatar: user.avatar,
    userUrl: user.url,
  })
})
