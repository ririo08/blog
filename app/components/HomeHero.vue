<script setup lang="ts">
const topics = [
  { label: 'Web development', icon: 'i-lucide-code-2' },
  { label: 'Streaming', icon: 'i-lucide-radio' },
  { label: 'Daily notes', icon: 'i-lucide-sparkles' },
]
</script>

<template>
  <section class="not-prose relative overflow-hidden border-b border-default">
    <div
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div class="hero-grid absolute inset-0 opacity-40 dark:opacity-25" />
      <div class="hero-orb hero-orb-primary absolute -top-32 left-[8%] size-80 rounded-full blur-3xl" />
      <div class="hero-orb hero-orb-secondary absolute -right-24 top-1/4 size-72 rounded-full blur-3xl" />
      <div class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-default to-transparent" />
    </div>

    <UPageHero
      orientation="horizontal"
      :ui="{
        root: 'relative',
        container: 'relative py-20 sm:py-28 lg:py-32 gap-12 lg:gap-16',
        wrapper: 'max-w-2xl',
        headline: 'mb-5',
        title: 'text-5xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-[-0.045em]',
        description: 'mt-6 max-w-xl text-base sm:text-lg/8',
        links: 'mt-8 flex flex-wrap items-center gap-3',
      }"
    >
      <template #headline>
        <UBadge
          color="primary"
          variant="subtle"
          size="lg"
          icon="i-lucide-sparkles"
          class="rounded-full px-3.5"
        >
          Welcome to my little corner
        </UBadge>
      </template>

      <template #title>
        つくったものと、<br>
        <span class="hero-title-gradient">考えたこと。</span>
      </template>

      <template #description>
        Web 技術の試行錯誤、配信まわりの工夫、ときどき日々の振り返り。
        あとで役立つ知識と、そのとき感じたことを気ままに残しています。
      </template>

      <template #links>
        <UButton
          to="#latest-posts"
          size="xl"
          trailing-icon="i-lucide-arrow-down"
          class="rounded-full shadow-lg shadow-primary/20"
        >
          最新記事を読む
        </UButton>
        <UButton
          to="https://github.com/ririo08"
          target="_blank"
          size="xl"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
          trailing-icon="i-lucide-arrow-up-right"
          class="rounded-full"
        >
          GitHub
        </UButton>
      </template>

      <div class="relative mx-auto w-full max-w-lg lg:max-w-none">
        <div
          class="hero-card-glow absolute -inset-5 rounded-[2.5rem] blur-2xl"
          aria-hidden="true"
        />
        <UCard
          variant="subtle"
          class="hero-card relative overflow-hidden rounded-3xl ring-1 ring-default/80 shadow-2xl shadow-primary/10"
          :ui="{
            header: 'px-5 sm:px-6 py-4 border-b border-default/70',
            body: 'p-5 sm:p-7',
            footer: 'px-5 sm:px-6 py-4 border-t border-default/70',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between gap-4">
              <div
                class="flex items-center gap-2"
                aria-hidden="true"
              >
                <span class="size-2.5 rounded-full bg-error" />
                <span class="size-2.5 rounded-full bg-warning" />
                <span class="size-2.5 rounded-full bg-success" />
              </div>
              <span class="font-mono text-xs text-muted">notes.md</span>
            </div>
          </template>

          <div class="space-y-6">
            <div>
              <p class="font-mono text-xs font-medium tracking-widest text-primary uppercase">
                Today I learned
              </p>
              <p class="mt-2 text-xl font-semibold tracking-tight text-highlighted sm:text-2xl">
                小さな発見を、<br>次のアイデアへ。
              </p>
            </div>

            <div class="space-y-3">
              <div
                v-for="topic in topics"
                :key="topic.label"
                class="group flex items-center gap-3 rounded-xl border border-default/70 bg-default/60 p-3 transition hover:border-primary/40 hover:bg-elevated"
              >
                <span class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-105">
                  <UIcon
                    :name="topic.icon"
                    class="size-4.5"
                  />
                </span>
                <span class="font-mono text-sm text-toned">{{ topic.label }}</span>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="ml-auto size-4 text-dimmed"
                />
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center justify-between gap-4 text-xs text-muted">
              <span class="flex items-center gap-2">
                <span class="relative flex size-2">
                  <span class="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span class="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Writing from Tokyo
              </span>
              <span class="font-mono">ririo / blog</span>
            </div>
          </template>
        </UCard>
      </div>
    </UPageHero>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--ui-border) 70%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ui-border) 70%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black 10%, transparent 88%);
}

.hero-orb {
  opacity: 0.22;
  animation: drift 10s ease-in-out infinite alternate;
}

.hero-orb-primary {
  background: var(--ui-primary);
}

.hero-orb-secondary {
  background: var(--ui-secondary);
  animation-delay: -4s;
}

.hero-title-gradient {
  color: transparent;
  background: linear-gradient(110deg, var(--ui-primary), var(--ui-secondary), var(--ui-primary));
  background-size: 200% auto;
  background-clip: text;
  animation: shimmer 7s linear infinite;
}

.hero-card-glow {
  background: linear-gradient(135deg, color-mix(in srgb, var(--ui-primary) 30%, transparent), color-mix(in srgb, var(--ui-secondary) 22%, transparent));
  opacity: 0.55;
}

.hero-card {
  backdrop-filter: blur(18px);
  background: color-mix(in srgb, var(--ui-bg) 86%, transparent);
  transform: rotate(1.25deg);
  transition: transform 300ms ease;
}

.hero-card:hover {
  transform: rotate(0deg) translateY(-4px);
}

@keyframes drift {
  from { transform: translate3d(-4%, -2%, 0) scale(0.95); }
  to { transform: translate3d(6%, 5%, 0) scale(1.08); }
}

@keyframes shimmer {
  to { background-position: 200% center; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-orb,
  .hero-title-gradient {
    animation: none;
  }

  .hero-card {
    transition: none;
  }
}
</style>
