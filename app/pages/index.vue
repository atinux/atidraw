<script setup lang="ts">
import { UseTimeAgo, vInfiniteScroll } from '@vueuse/components'

const { data } = await useFetch('/api/drawings', {
  // don't return a shallowRef as we mutate the array
  deep: true
})

const loading = ref(false)
async function loadMore() {
  if (loading.value || !data.value?.hasMore) return
  loading.value = true

  const more = await $fetch(`/api/drawings`, {
    query: { cursor: data.value.cursor }
  })
  data.value.blobs.push(...more.blobs)
  data.value.cursor = more.cursor
  data.value.hasMore = more.hasMore
  loading.value = false
}
</script>

<template>
  <UPageBody>
    <UPageGrid class="lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="(drawing, index) in data?.blobs"
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
    <div v-if="data?.hasMore" v-infinite-scroll="[loadMore, { distance: 10, interval: 1000 }]" class="flex items-center justify-center mt-2 p-4">
      <UButton
        color="gray"
        block
        size="md"
        :loading="loading"
        :label="loading ? 'Loading more drawings...' : 'Load more drawings'"
        @click="loadMore"
      />
    </div>
  </UPageBody>
</template>
