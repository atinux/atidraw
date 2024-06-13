<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

const { data: drawings } = await useFetch('/api/drawings')
</script>

<template>
  <UPageBody>
    <UPageGrid class="lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="drawing in drawings"
        :key="drawing.pathname"
        class="flex flex-col gap-2"
      >
        <img
          :src="`/drawings/${drawing.pathname}`"
          :alt="drawing.pathname"
          class="max-w-[400px] w-full rounded aspect-1"
          loading="lazy"
        >
        <div class="flex items-center justify-between max-w-[400px]">
          <NuxtLink
            class="flex items-center gap-1"
            :to="drawing.customMetadata?.userUrl"
            target="_blank"
          >
            <UAvatar
              :src="drawing.customMetadata?.userAvatar"
              size="xs"
            />
            <span class="text-xs font-semibold">{{ drawing.customMetadata?.userName }}</span>
          </NuxtLink>
          <UseTimeAgo
            v-slot="{ timeAgo }"
            :time="new Date(drawing.uploadedAt)"
          >
            <span class="text-xs text-gray-500">{{ timeAgo }}</span>
          </UseTimeAgo>
        </div>
      </div>
    </UPageGrid>
  </UPageBody>
</template>
