import { blob } from 'hub:blob'

export default eventHandler(async (event) => {
  const { pathname } = event.context.params || {}

  return blob.serve(event, pathname)
})
