export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        provider: 'github',
        id: String(user.id),
        name: user.name || user.login,
        avatar: user.avatar_url,
        url: user.html_url,
      },
    })

    return sendRedirect(event, '/draw')
  },
})
