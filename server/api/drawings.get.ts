export default eventHandler(async (event) => {
  const { cursor } = await getQuery<{ cursor?: string }>(event)

  return hubBlob().list({
    limit: 100,
    cursor,
    prefix: 'drawings/',
  })
})
