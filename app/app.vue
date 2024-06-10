<script setup lang="ts">
useSeoMeta({
  title: 'Instadraw',
  description: 'Share your drawings with the world.',
})
useServerHead({
  meta: [
    { name: 'google-site-verification', content: 'ocIv8ZYQ5s35CIAYVpjPYyhBnWu7mo0JpdzOeWV4PZs' },
  ],
})
</script>

<template>
  <AppHeader />
  <UContainer>
    <UMain>
      <NuxtPage />
    </UMain>
  </UContainer>
  <AppFooter />
</template>
