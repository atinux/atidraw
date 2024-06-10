<script setup lang="ts">
useSeoMeta({
  title: 'Instadraw',
  description: 'Create a drawing and share it with the world!',
  ogTitle: 'Instadraw',
  ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2RyYXcubnV4dC5kZXYiLCJpYXQiOjE3MTgwMTc3OTF9.ORrHGOCvTaxN7Lk24swRO7k-mrHmExypBquOA8FUlyg.jpg?theme=light',
  twitterCard: 'summary_large_image',
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
