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

const allTags = computed(() => {
  return [...new Set(posts.value.flatMap(post => post.tags))]
})

const selectedTag = ref<string>()

const filteredPosts = computed(() => {
  const tag = selectedTag.value
  if (!tag) {
    return posts.value
  }

  return posts.value.filter(post => post.tags.includes(tag))
})

function toggleTag(tag?: string) {
  selectedTag.value = selectedTag.value === tag ? undefined : tag
}

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
  <section
    id="latest-posts"
    class="not-prose relative scroll-mt-20 py-20 sm:py-28"
  >
    <UContainer>
      <div class="mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
        <div class="max-w-2xl">
          <div class="mb-4 flex items-center gap-3">
            <UBadge
              color="primary"
              variant="subtle"
              icon="i-lucide-newspaper"
              class="rounded-full"
            >
              Latest stories
            </UBadge>
            <span class="font-mono text-xs text-muted">
              {{ filteredPosts.length }}{{ selectedTag ? ` / ${posts.length}` : '' }} posts
            </span>
          </div>
          <h2 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            最新記事
          </h2>
          <p class="mt-3 text-base text-muted sm:text-lg">
            技術メモから活動の振り返りまで、最近書いたものをまとめています。
          </p>
        </div>

        <div
          v-if="allTags.length"
          class="flex max-w-md flex-wrap gap-2 sm:justify-end"
          aria-label="記事のタグ"
        >
          <UButton
            label="すべて"
            color="neutral"
            :variant="selectedTag ? 'outline' : 'soft'"
            size="sm"
            class="rounded-full"
            :aria-pressed="!selectedTag"
            @click="toggleTag()"
          />
          <UButton
            v-for="tag in allTags"
            :key="tag"
            :label="`#${tag}`"
            :color="selectedTag === tag ? 'primary' : 'neutral'"
            :variant="selectedTag === tag ? 'soft' : 'outline'"
            size="sm"
            class="rounded-full"
            :aria-pressed="selectedTag === tag"
            @click="toggleTag(tag)"
          />
        </div>
      </div>

      <UPageGrid v-if="filteredPosts.length">
        <UPageCard
          v-for="(post, index) in filteredPosts"
          :key="post.path"
          :to="post.path"
          :highlight="index === 0"
          highlight-color="primary"
          spotlight
          spotlight-color="primary"
          variant="subtle"
          class="group min-h-64 overflow-hidden rounded-2xl"
          :ui="{
            container: 'p-6 sm:p-7',
            title: 'text-lg leading-snug group-hover:text-primary transition-colors',
            description: 'mt-3 leading-6',
            footer: 'pt-6',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <UBadge
                v-if="index === 0"
                color="primary"
                variant="soft"
                size="sm"
                icon="i-lucide-sparkles"
                class="rounded-full"
              >
                New
              </UBadge>
              <span
                v-else
                class="font-mono text-xs text-dimmed"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span class="ml-auto flex items-center gap-1.5 text-xs text-muted">
                <UIcon
                  name="i-lucide-calendar-days"
                  class="size-3.5"
                />
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              </span>
            </div>
          </template>

          <template #title>
            {{ post.title || 'Untitled' }}
          </template>

          <template #description>
            {{ post.description || '記事を読む' }}
          </template>

          <template #footer>
            <div class="flex items-end justify-between gap-4">
              <div class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="tag in post.tags"
                  :key="`${post.path}-${tag}`"
                  color="neutral"
                  variant="soft"
                  size="sm"
                  class="rounded-md"
                >
                  #{{ tag }}
                </UBadge>
              </div>
              <span class="flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
                Read
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>

      <UAlert
        v-else
        color="neutral"
        variant="subtle"
        icon="i-lucide-notebook-pen"
        title="記事を準備中です"
        description="新しい記事が公開されるまで、もうしばらくお待ちください。"
      />
    </UContainer>
  </section>
</template>
