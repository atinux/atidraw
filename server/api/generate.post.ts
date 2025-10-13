import { generateText } from 'ai'

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
  const drawingArrayBuffer = await drawing.arrayBuffer()

  // Describe the drawing
  const { text } = await generateText({
    model: hubAI('openai/gpt-5-nano'),
    prompt: [{
      role: 'user',
      content: 'Describe this drawing in one sentence.',
    }, {
      role: 'user',
      content: [{
        type: 'image',
        image: drawingArrayBuffer,
      }],
    }],
  }).catch(() => {
    return { text: '' }
  })

  setHeader(event, 'x-description', text)

  const result = await generateText({
    model: hubAI('google/gemini-2.5-flash-image-preview'),
    providerOptions: {
      google: { responseModalities: ['TEXT', 'IMAGE'] },
    },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Generate a more detailed and beautiful image of the following drawing:',
          },
          {
            type: 'image',
            image: drawingArrayBuffer,
          }
        ],
      },
    ],
  })
  const image = result.files[0]
  if (!image) {
    throw createError({
      statusCode: 500,
      message: 'Failed to generate image',
    })
  }
  setHeader(event, 'content-type', image.mediaType)
  return image.uint8Array
})
