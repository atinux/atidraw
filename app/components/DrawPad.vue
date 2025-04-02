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
const emit = defineEmits(['draw', 'save'])

const canPost = ref(false)
const canvas = ref()
const signaturePad = ref()

defineShortcuts({
  meta_z: undo,
  meta_k: clear,
})

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
  signaturePad.value.addEventListener('endStroke', () => {
    if (!signaturePad.value || signaturePad.value.isEmpty() || props.saving) return
    const dataURL = signaturePad.value.toDataURL(props.saveType)
    emit('draw', dataURL)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  signaturePad.value?.off()
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
      class="border border-(--ui-border) rounded-md"
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
        <UTooltip
          text="Undo"
          :kbds="['meta', 'z']"
        >
          <UButton
            variant="ghost"
            color="neutral"
            label="Undo"
            icon="i-ph-arrow-arc-left"
            @click="undo"
          />
        </UTooltip>
        <UTooltip
          text="Clear"
          :kbds="['meta', 'k']"
        >
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-ph-x"
            label="Clear"
            @click="clear"
          />
        </UTooltip>
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
    <UAlert
      class="mt-6"
      color="warning"
      variant="subtle"
      title="This demo is intended for the public. Please note that any sensitive or political drawings will be removed without notice."
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
a, button, canvas {
  user-select: none;
}
</style>
