<script setup>
const colorMode = useColorMode()

// Computed
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <footer>
    <UContainer class="py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
      <div class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3">
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
            color="neutral"
            variant="ghost"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          to="https://git.new/draw"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
        />
        <UButton
          to="https://x.com/atinux"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-x"
        />
      </div>
      <div class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1">
        <span class="text-sm">Made with <ULink
          to="https://nuxt.com/?utm_source=atidraw"
          class="font-medium hover:underline underline-offset-3"
        >
          Nuxt
        </ULink>, <ULink
          to="https://ui.nuxt.com/?utm_source=atidraw"
          class="font-medium hover:underline underline-offset-3"
        >
          Nuxt UI
        </ULink> & <ULink
          to="https://hub.nuxt.com/?utm_source=atidraw"
          class="font-medium hover:underline underline-offset-3"
        >NuxtHub</ULink>.</span>
      </div>
    </UContainer>
  </footer>
</template>
