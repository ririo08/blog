<script setup lang="ts">
interface PostItem {
  title?: string
  path?: string
  description?: string
  date?: string
  tags: string[]
}

const { data } = await useAsyncData('home-post-list', () =>
  queryCollection('docs')
    .select('title', 'path', 'description', 'meta')
    .all(),
)

const posts = computed(() => {
  return (data.value ?? [])
    .map((raw: unknown): PostItem => {
      const post = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>
      const meta = (typeof post.meta === 'object' && post.meta !== null ? post.meta : {}) as Record<string, unknown>

      return {
        title: typeof post.title === 'string' ? post.title : undefined,
        path: typeof post.path === 'string' ? post.path : undefined,
        description: typeof post.description === 'string' ? post.description : undefined,
        date: typeof meta.date === 'string' ? meta.date : undefined,
        tags: Array.isArray(meta.tags) ? meta.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
      }
    })
    .filter((post: PostItem) => post.path && post.path !== '/index')
    .sort((first: PostItem, second: PostItem) => {
      const firstTime = Date.parse((first.date ?? '').replace(' ', 'T'))
      const secondTime = Date.parse((second.date ?? '').replace(' ', 'T'))
      return (Number.isNaN(secondTime) ? 0 : secondTime) - (Number.isNaN(firstTime) ? 0 : firstTime)
    })
})

function formatDate(input?: string) {
  if (!input) {
    return ''
  }

  const date = new Date(input.replace(' ', 'T'))
  if (Number.isNaN(date.getTime())) {
    return input
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
</script>

<template>
  <div class="not-prose space-y-4">
    <NuxtLink
      v-for="post in posts"
      :key="post.path"
      :to="post.path"
      class="block rounded-xl border border-default p-5 hover:bg-elevated/50 transition"
    >
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-lg font-semibold leading-tight">
          {{ post.title || 'Untitled' }}
        </h3>
        <span class="text-sm text-muted whitespace-nowrap">
          {{ formatDate(post.date) }}
        </span>
      </div>
      <p
        v-if="post.description"
        class="mt-2 text-sm text-toned"
      >
        {{ post.description }}
      </p>
      <div
        v-if="post.tags.length"
        class="mt-3 flex flex-wrap gap-2"
      >
        <span
          v-for="tag in post.tags"
          :key="`${post.path}-${tag}`"
          class="rounded-md border border-default px-2 py-1 text-xs text-muted"
        >
          #{{ tag }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
