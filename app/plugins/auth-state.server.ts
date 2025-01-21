export default defineNuxtPlugin(() => {
  const { oauth } = useRuntimeConfig(useRequestEvent())

  // Expose the auth providers to the client
  useState('authProviders', () => {
    return {
      google: Boolean(oauth.google.clientId && oauth.google.clientSecret),
      github: Boolean(oauth.github.clientId && oauth.github.clientSecret),
    }
  })
})
