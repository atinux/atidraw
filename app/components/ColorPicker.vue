<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: 'Color',
  },
  default: {
    type: String,
    default: '#030712',
  },
  icon: {
    type: String,
    default: 'i-ph-pencil',
  },
})
const emit = defineEmits(['color'])

// Tailwind CSS 500 colors hexadecimal values
const colors = ['#f87171', '#fb923c', '#fbbf24', '#facc15', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185']
const grayColors = ['#030712', '#1f2937', '#4b5563', '#9ca3af', '#e5e7eb', '#f9fafb']
const current = ref(props.default)
function setColor(hex: string) {
  current.value = hex
  emit('color', hex)
}
</script>

<template>
  <UPopover
    mode="hover"
    :ui="{ width: 'w-[156px]' }"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        square
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        aria-label="Color picker"
        :icon="icon"
      >
        <div
          class="w-5 h-5 rounded-full"
          :style="{ backgroundColor: current }"
        />
      </UButton>
    </template>

    <template #panel>
      <div class="p-2">
        <div class="grid grid-cols-6 gap-px">
          <div
            v-for="color in colors"
            :key="color"
            class="w-5 h-5 rounded-full border-2 hover:border-gray-200 cursor-pointer"
            :class="color === current ? 'border-gray-200' : 'border-white'"
            :style="{ backgroundColor: color }"
            @click="setColor(color)"
          />
        </div>

        <hr class="border-gray-200 dark:border-gray-800 my-2">

        <div class="grid grid-cols-6 gap-px">
          <div
            v-for="color in grayColors"
            :key="color"
            class="w-5 h-5 rounded-full border-2 hover:border-gray-200 cursor-pointer"
            :class="color === current ? 'border-gray-200' : 'border-white'"
            :style="{ backgroundColor: color }"
            @click="setColor(color)"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
