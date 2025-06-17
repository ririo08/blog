<script setup lang="ts">
const { data: articles } = await useAsyncData('content', () =>
  queryCollection('content')
    .order('date', 'DESC')
    .select('title', 'path', 'description', 'date')
    .all(),
)
</script>

<template>
  <main class="prose mx-auto py-4">
    <h2>記事一覧</h2>
    <ul>
      <li
        v-for="article in articles"
        :key="article.path"
        class="mb-4"
      >
        <NuxtLink
          :to="article.path"
          class="text-xl font-semibold hover:underline"
        >
          {{ article.title }}
        </NuxtLink>
        <p>{{ extractDate(article.date) }}</p>
        <p class="text-gray-600">
          {{ article.description }}
        </p>
      </li>
    </ul>
  </main>
</template>
