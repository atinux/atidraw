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
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
            color="gray"
            variant="ghost"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          to="https://git.new/draw"
          color="gray"
          variant="ghost"
          icon="i-simple-icons-github"
        />
        <UButton
          to="https://x.com/atinux"
          color="gray"
          variant="ghost"
          icon="i-simple-icons-x"
        />
      </div>
      <div class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1">
        <span class="text-sm">Made with <UButton
          to="https://nuxt.com/?utm_source=atidraw"
          variant="link"
          color="black"
          :padded="false"
        >
          Nuxt
        </UButton>, <UButton
          to="https://ui.nuxt.com/?utm_source=atidraw"
          variant="link"
          color="black"
          :padded="false"
        >
          Nuxt UI
        </UButton> & <UButton
          to="https://hub.nuxt.com/?utm_source=atidraw"
          variant="link"
          color="black"
          :padded="false"
        >NuxtHub</UButton>.</span>
      </div>
    </UContainer>
  </footer>
</template>
