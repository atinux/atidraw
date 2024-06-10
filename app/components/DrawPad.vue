<script setup lang="ts">
import SignaturePad from 'signature_pad'

const props = defineProps({
  saveLabel: {
    type: String,
    default: 'Save',
  },
  saveType: {
    type: String,
    default: 'image/jpeg',
  },
  saving: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['save'])

const canPost = ref(false)
const canvas = ref()
const signaturePad = ref()

onMounted(() => {
  signaturePad.value = new SignaturePad(canvas.value, {
    penColor: '#030712',
    backgroundColor: '#f9fafb',
    minWidth: 5,
    maxWidth: 5,
  })
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  signaturePad.value.addEventListener('afterUpdateStroke', () => {
    canPost.value = !signaturePad.value.isEmpty()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
})

function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.value.width = canvas.value.offsetWidth * ratio
  canvas.value.height = canvas.value.offsetHeight * ratio
  canvas.value.getContext('2d').scale(ratio, ratio)
  signaturePad.value.fromData(signaturePad.value.toData())
}

function clear() {
  if (!signaturePad.value) return
  signaturePad.value.clear()
  canPost.value = false
}

function undo() {
  if (!signaturePad.value) return
  const data = signaturePad.value.toData()
  if (data) {
    data.pop() // remove the last dot or line
    signaturePad.value.fromData(data)
    canPost.value = !signaturePad.value.isEmpty()
  }
}
function setPenColor(color: string) {
  if (!signaturePad.value) return
  signaturePad.value.penColor = color
}
function setBackground(color: string) {
  if (!signaturePad.value) return
  signaturePad.value.backgroundColor = color
  const data = signaturePad.value.toData()
  signaturePad.value.clear()
  signaturePad.value.fromData(data)
}
function setPenSize(size: number) {
  if (!signaturePad.value) return
  signaturePad.value.minWidth = signaturePad.value.maxWidth = size
}

async function save() {
  if (!signaturePad.value || signaturePad.value.isEmpty() || props.saving) return
  const dataURL = signaturePad.value.toDataURL(props.saveType)
  emit('save', dataURL)
}
</script>

<template>
  <div class="max-w-[400px]">
    <canvas
      ref="canvas"
      class="border rounded-md"
    />
    <div class="flex justify-between">
      <div
        class="flex items-center gap-2 mt-2"
      >
        <ColorPicker @color="setPenColor" />
        <ColorPicker
          icon="i-ph-paint-bucket"
          default="#f9fafb"
          @color="setBackground"
        />
        <StrokePicker
          :color="signaturePad?.penColor"
          @size="setPenSize"
        />
      </div>
      <div class="flex items-center">
        <UButton
          variant="ghost"
          color="gray"
          label="Undo"
          icon="i-ph-arrow-arc-left"
          @click="undo"
        />
        <UButton
          variant="ghost"
          color="gray"
          icon="i-ph-x"
          label="Clear"
          @click="clear"
        />
      </div>
    </div>
    <UButton
      :label="saveLabel"
      class="mt-4"
      size="lg"
      block
      :disabled="!canPost"
      :loading="saving"
      @click="save"
    />
  </div>
</template>

<style scoped>
canvas {
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
</style>
