/**
 * Generate a new image based on the drawing using AI
 * Used in the `<AIDraw />` component.
 * Uncomment it in pages/draw.vue to enable the AI description feature.
 */
export default eventHandler(async (event) => {
  await requireUserSession(event)

  // Get the drawing and convert it to a array buffer
  const form = await readFormData(event)
  const drawing = form.get('drawing') as File
  const arrayBuffer = await drawing.arrayBuffer()

  // Ask LLaVA to describe the drawing
  const { description } = await hubAI().run('@cf/llava-hf/llava-1.5-7b-hf', {
    prompt: 'Describe this drawing in one sentence.',
    image: [...new Uint8Array(arrayBuffer)],
  }).catch(() => {
    return { description: '' }
  })

  setHeader(event, 'content-type', 'image/png')
  setHeader(event, 'x-description', description)
  return await hubAI().run('@cf/runwayml/stable-diffusion-v1-5-img2img', {
    prompt: description || 'Make it a painting.',
    guidance: 8,
    strength: 0.75,
    image: [...new Uint8Array(arrayBuffer)],
  })
})
