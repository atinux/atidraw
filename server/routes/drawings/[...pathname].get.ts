import { blob } from 'hub:blob'

export default cachedEventHandler(async (event) => {
  const { pathname } = event.context.params || {}

  return blob.serve(event, pathname)
}, {
  maxAge: 60 * 60 * 24 * 30, // 30 days
})
