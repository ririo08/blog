<script setup lang="ts">
</script>

<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1 class="text-xl font-bold">
          {{ doc.title }}
        </h1>
        <p class="text-right">
          <UIcon name="i-heroicons-clock" />
          {{ useDateFormat(doc.date, 'YYYY/MM/DD') }}
        </p>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>
