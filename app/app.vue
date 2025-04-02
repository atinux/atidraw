<script setup lang="ts">
useSeoMeta({
  title: 'Draw and share your Art with Atidraw',
  description: 'Atidraw is a web application that lets you to create, enhance, and share your drawings with the world. Harnessing the power of Cloudflare R2 and Cloudflare AI to store and enhance your drawings.',
  ogTitle: 'Atidraw',
  ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2RyYXcubnV4dC5kZXYiLCJpYXQiOjE3MTgwMTc3OTF9.ORrHGOCvTaxN7Lk24swRO7k-mrHmExypBquOA8FUlyg.jpg?theme=light',
  twitterCard: 'summary_large_image',
})
if (import.meta.server) {
  useHead({
    meta: [
      { name: 'google-site-verification', content: 'ocIv8ZYQ5s35CIAYVpjPYyhBnWu7mo0JpdzOeWV4PZs' },
    ],
  })
}
</script>

<template>
  <UApp>
    <AppHeader />
    <UContainer>
      <main class="min-h-[calc(100vh-192px)]">
        <NuxtPage />
      </main>
    </UContainer>
    <AppFooter />
  </UApp>
</template>
