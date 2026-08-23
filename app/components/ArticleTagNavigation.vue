<script setup lang="ts">
const { activeTag, tagNavigation } = await useArticleTagNavigation()
const contentNavVariants = useUIConfig('contentNavigation')
</script>

<template>
  <div v-if="activeTag">
    <div class="mb-4 flex flex-wrap items-center gap-2 px-2">
      <span class="text-xs font-semibold uppercase tracking-wider text-muted">
        同じタグの記事
      </span>
      <UBadge
        color="primary"
        variant="soft"
        size="sm"
        class="rounded-full"
      >
        #{{ activeTag }}
      </UBadge>
    </div>

    <UContentNavigation
      :collapsible="false"
      :highlight="contentNavVariants.highlight ?? true"
      :highlight-color="contentNavVariants.highlightColor"
      :variant="contentNavVariants.variant ?? 'link'"
      :color="contentNavVariants.color"
      :navigation="tagNavigation"
    />
  </div>
</template>
