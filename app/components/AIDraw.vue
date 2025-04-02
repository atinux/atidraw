<script setup lang="ts">
const props = defineProps({
  drawing: String,
})
const toast = useToast()

const generating = ref(false)
const generatedImage = ref()
const drawingDescription = ref('')

async function generateDrawing() {
  if (generating.value || !props.drawing) return
  generating.value = true
  const blob = await fetch(props.drawing).then(res => res.blob())
  const form = new FormData()
  form.append('drawing', new File([blob], `drawing.jpg`, { type: 'image/jpeg' }))
  $fetch.raw<Blob>('/api/generate', {
    method: 'POST',
    body: form,
  }).then((res) => {
    drawingDescription.value = res.headers.get('x-description') || ''
    generatedImage.value = URL.createObjectURL(res._data as Blob)
    generating.value = false
  }).catch((err) => {
    if (!err.status) return
    generating.value = false
    toast.add({
      color: 'error',
      title: err.data?.message || err.message,
    })
  })
}
</script>

<template>
  <div class="max-w-[400px]">
    <UButton
      label="Draw with AI"
      size="md"
      block
      color="neutral"
      variant="subtle"
      :loading="generating"
      :disabled="!drawing"
      @click="generateDrawing()"
    />
    <img
      v-if="generatedImage"
      :src="generatedImage"
      :alt="drawingDescription"
      class="mt-4 w-full h-auto aspect-[1] rounded"
      :class="{ 'animate-pulse': generating }"
    >
    <USkeleton
      v-else-if="generating"
      class="w-full h-auto aspect-[1] mt-4 bg-(--ui-bg-accented)"
    />
    <div
      v-else
      class="border border-(--ui-border) rounded w-full h-auto aspect-[1] mt-4 bg-(--ui-bg-accented)"
    />
    <USkeleton
      v-if="generating"
      class="h-6 w-full bg-(--ui-bg-accented) mt-4"
    />
    <div
      v-else-if="drawingDescription"
      class="text-center truncate mt-4"
    >
      {{ drawingDescription }}
    </div>
  </div>
</template>
