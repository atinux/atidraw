export default eventHandler(async () => {
  const { blobs } = await hubBlob().list({
    limit: 50,
  })

  return blobs
})
