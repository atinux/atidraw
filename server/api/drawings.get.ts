export default eventHandler(async () => {
  const { blobs } = await hubBlob().list({
    limit: 100,
  })

  return blobs
})
