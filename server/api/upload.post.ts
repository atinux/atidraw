export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  return hubBlob().handleUpload(event, {
    types: ['image/jpeg'],
    maxSize: '1MB',
    // prefix: `${user.provider}/${user.id}`,
    // Metatada
    userProvider: user.provider,
    userId: user.id,
    userName: user.name,
    userAvatar: user.avatar,
    userUrl: user.url,
  })
})
