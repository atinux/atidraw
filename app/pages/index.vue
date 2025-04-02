<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core'
import { UseTimeAgo, vInfiniteScroll } from '@vueuse/components'

const { data } = await useFetch('/api/drawings', {
  // don't return a shallowRef as we mutate the array
  deep: true,
})

const loading = ref(false)
async function loadMore() {
  if (loading.value || !data.value?.hasMore) return
  loading.value = true

  const more = await $fetch(`/api/drawings`, {
    query: { cursor: data.value.cursor },
  })
  data.value.blobs.push(...more.blobs)
  data.value.cursor = more.cursor
  data.value.hasMore = more.hasMore
  loading.value = false
}

function drawingTitle(drawing: BlobObject) {
  const title = drawing.customMetadata?.description || ''
  if (!drawing.customMetadata?.aiImage) {
    return title + '\n[AI image could not be generated]'
  }
  return title
}
</script>

<template>
  <div class="my-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
      <div
        v-for="drawing in data?.blobs"
        :key="drawing.pathname"
        class="flex flex-col gap-2"
      >
        <div
          class="group relative max-w-[400px]"
          :title="drawingTitle(drawing)"
        >
          <img
            :src="`/drawings/${drawing.pathname}`"
            :alt="drawing.customMetadata?.description || drawing.pathname"
            class="w-full rounded aspect-1"
            loading="lazy"
          >
          <img
            v-if="drawing.customMetadata?.aiImage"
            :src="`/drawings/${drawing.customMetadata?.aiImage}`"
            :alt="`AI image generated of ${drawing.customMetadata?.description || drawing.pathname}`"
            :title="drawing.customMetadata?.description || ''"
            class="w-full rounded aspect-1 absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-200"
            loading="lazy"
          >
        </div>
        <div class="flex items-center justify-between max-w-[400px]">
          <NuxtLink
            class="flex items-center gap-1"
            :to="drawing.customMetadata?.userUrl"
            target="_blank"
          >
            <UAvatar
              :src="drawing.customMetadata?.userAvatar"
              size="xs"
              icon="i-ph-mask-happy-duotone"
            />
            <span class="text-xs font-semibold">{{ drawing.customMetadata?.userName }}</span>
          </NuxtLink>
          <UseTimeAgo
            v-slot="{ timeAgo }"
            :time="new Date(drawing.customMetadata?.uploadedAt || drawing.uploadedAt)"
          >
            <span class="text-xs text-(--ui-text-muted)">{{ timeAgo }}</span>
          </UseTimeAgo>
        </div>
      </div>
    </div>
    <div
      v-if="data?.hasMore"
      v-infinite-scroll="[loadMore, { distance: 10, interval: 1000 }]"
      class="flex items-center justify-center mt-2 p-4"
    >
      <UButton
        color="neutral"
        variant="subtle"
        block
        size="md"
        :loading="loading"
        :label="loading ? 'Loading more drawings...' : 'Load more drawings'"
        @click="loadMore"
      />
    </div>
  </div>
</template>
