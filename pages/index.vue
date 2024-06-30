<script setup lang="ts">
import type { MarkdownRoot } from '@nuxt/content'

const getImage = (source: MarkdownRoot | null): string => {
  if (source?.children) {
    for (const child of source.children) {
      if (child.children?.some(s => s.tag === 'img'))
        return child.children?.find(s => s.tag === 'img')!.props!.src as string
    }
  }
  return ''
}
</script>

<template>
  <main>
    <ContentList
      v-slot="{ list }"
      :query="{ sort: [{ date: -1 }] }"
      path="/"
    >
      <div
        v-for="article in list"
        :key="article._path"
        class="mt-4"
      >
        <NuxtLink :to="article._path">
          <UAlert
            icon="i-heroicons-command-line"
            :description="article.description"
            :title="article.title"
          >
            <template #description>
              <div>{{ article.description }}</div>
              <img
                class="my-2"
                :src="getImage(article.body)"
              >
              <UBadge
                v-for="Badge in article.tags"
                :key="Badge"
                color="white"
                class="mt-2"
              >
                {{ Badge }}
              </UBadge>

              <div class="mt-2 text-xs">
                {{ useDateFormat(article.date, 'YYYY/MM/DD') }}
              </div>
            </template>
          </UAlert>
        </NuxtLink>
      </div>
    </ContentList>
  </main>
</template>

<style scoped></style>
