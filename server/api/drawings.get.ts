import { blob } from 'hub:blob'

export default eventHandler(async (event) => {
  const { cursor } = await getQuery<{ cursor?: string }>(event)

  const res = await blob.list({
    limit: 20,
    cursor,
    prefix: 'drawings/',
  })

  // Fetch the custom metadata for each blob (only when not using r2 binding)
  res.blobs = await Promise.all(res.blobs.map(b => !Object.keys(b.customMetadata).length ? blob.head(b.pathname) : b))
  // backward compatibility with the old blob custom metadata
  // @ts-expect-error - customMetadata is not typed
  res.blobs = res.blobs.map((b) => {
    const aiImage = b.customMetadata?.aiImage || b.customMetadata?.aiimage || b.customMetadata?.ai_image
    return {
      ...b,
      customMetadata: {
        url: process.env.S3_PUBLIC_URL ? `${process.env.S3_PUBLIC_URL}/${b.pathname}` : undefined,
        userProvider: b.customMetadata?.userProvider || b.customMetadata?.userprovider || b.customMetadata?.user_provider,
        userId: b.customMetadata?.userId || b.customMetadata?.userid || b.customMetadata?.user_id,
        userName: b.customMetadata?.userName || b.customMetadata?.username || b.customMetadata?.user_name,
        userAvatar: b.customMetadata?.userAvatar || b.customMetadata?.useravatar || b.customMetadata?.user_avatar,
        userUrl: b.customMetadata?.userUrl || b.customMetadata?.userurl || b.customMetadata?.user_url,
        description: b.customMetadata?.description,
        aiImage,
        aiImageUrl: b.customMetadata?.aiImageUrl || (process.env.S3_PUBLIC_URL ? `${process.env.S3_PUBLIC_URL}/${aiImage}` : undefined),
      },
    }
  })

  return res
})
