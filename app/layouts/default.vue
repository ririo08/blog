<script setup lang="ts"></script>

<template>
  <UContainer class="px-0">
    <main class="border-1 rounded-lg border-orange-500 m-2 p-2">
      <NuxtLink
        to="/"
      >
        <h1 class="text-2xl font-bold">
          # ririo blog
        </h1>
      </NuxtLink>
      <slot />
    </main>
  </UContainer>
</template>

<style scoped></style>
