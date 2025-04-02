<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#000000',
  },
})
const emit = defineEmits(['size'])

// Tailwind CSS 500 colors hexadecimal values
const sizes = [3, 5, 10, 15, 20]
const current = ref(sizes[1])
const ratio = ref(1)
onMounted(() => {
  ratio.value = Math.max(window.devicePixelRatio || 1, 1)
})
function setSize(size: number) {
  current.value = size
  emit('size', size)
}
</script>

<template>
  <UPopover
    mode="hover"
    :ui="{ content: 'w-[156px]' }"
  >
    <template #default="{ open }">
      <UButton
        color="neutral"
        variant="ghost"
        square
        :class="[open && 'bg-(--ui-bg-muted)']"
        aria-label="Stroke picker"
        icon="i-ph-line-segment"
      >
        {{ current }}
      </UButton>
    </template>

    <template #content>
      <div class="p-2">
        <div class="flex flex-col gap-2">
          <button
            v-for="size in sizes"
            :key="size"
            class="w-full rounded-full border-2 hover:border-neutral-400 cursor-pointer"
            :class="size === current ? 'border-neutral-400' : 'border-white'"
            :style="{ backgroundColor: color, height: `${size * ratio + 4}px` }"
            @click="setSize(size)"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
