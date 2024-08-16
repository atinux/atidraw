export default eventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.googleAuth || runtimeConfig.public.githubAuth) {
    throw createError({
      statusCode: 400,
      message: 'Please use Google or GitHub auth',
    })
  }
  const fingerprint = await getRequestFingerprint(event, {
    userAgent: true,
    xForwardedFor: true,
  })
  await setUserSession(event, {
    user: {
      provider: 'anonymous',
      id: fingerprint || 'anonymous',
      name: `${event.context.cf?.city}, ${event.context.cf?.country}`,
      avatar: '',
      url: '',
    },
  })

  return sendRedirect(event, '/draw')
})
