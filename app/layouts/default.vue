<script setup lang="ts"></script>

<template>
  <UContainer class="p-2 min-h-screen">
    <main class="border-1 rounded-lg border-orange-500 p-1 min-h-screen">
      <NuxtLink
        to="/"
      >
        <h1 class="text-2xl font-bold">
          # ririo blog
        </h1>
      </NuxtLink>
      <slot />
    </main>
    <small class="block text-right text-xs mt-2">
      リリオ
    </small>
  </UContainer>
</template>

<style scoped></style>
