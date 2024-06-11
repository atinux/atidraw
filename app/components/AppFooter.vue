<script setup>
const footerLinks = [
  {
    label: 'Source code',
    to: 'https://github.com/atinux/instadraw',
    target: '_blank',
  },
]
</script>

<template>
  <UFooter :links="footerLinks">
    <template #left>
      <span class="text-sm">Made with <UButton
        to="https://nuxt.com/?utm_source=instadraw"
        variant="link"
        color="black"
        :padded="false"
      >
        Nuxt
      </UButton>, <UButton
        to="https://ui.nuxt.com/?utm_source=instadraw"
        variant="link"
        color="black"
        :padded="false"
      >
        Nuxt UI
      </UButton> & <UButton
        to="https://hub.nuxt.com/?utm_source=instadraw"
        variant="link"
        color="black"
        :padded="false"
      >NuxtHub</UButton>.</span>
    </template>
    <template #right>
      <UColorModeButton />
      <UButton
        to="https://github.com/atinux/instadraw"
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
    </template>
  </UFooter>
</template>
