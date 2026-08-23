import type { ContentNavigationItem } from '@nuxt/content'

interface ArticleNavigationItem {
  title: string
  path: string
  date?: string
  tags: string[]
}

function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/$/, '') : path
}

function getTimestamp(date?: string) {
  if (!date) {
    return 0
  }

  const timestamp = Date.parse(date.replace(' ', 'T'))
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export async function useArticleTagNavigation() {
  const route = useRoute()
  const { data } = await useAsyncData('article-tag-navigation', () =>
    queryCollection('docs')
      .select('title', 'path', 'meta')
      .all(),
  )

  const articles = computed<ArticleNavigationItem[]>(() => {
    return (data.value ?? []).flatMap((raw: unknown) => {
      const article = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>
      const meta = (typeof article.meta === 'object' && article.meta !== null ? article.meta : {}) as Record<string, unknown>

      if (typeof article.title !== 'string' || typeof article.path !== 'string') {
        return []
      }

      return [{
        title: article.title,
        path: article.path,
        date: typeof meta.date === 'string' ? meta.date : undefined,
        tags: Array.isArray(meta.tags)
          ? meta.tags.filter((tag: unknown): tag is string => typeof tag === 'string')
          : [],
      }]
    })
  })

  const currentArticle = computed(() => {
    const currentPath = normalizePath(route.path)
    return articles.value.find(article => normalizePath(article.path) === currentPath)
  })

  const activeTag = computed(() => currentArticle.value?.tags[0])

  const tagNavigation = computed<ContentNavigationItem[]>(() => {
    const tag = activeTag.value
    if (!tag) {
      return []
    }

    return articles.value
      .filter(article => article.tags.includes(tag))
      .sort((first, second) => getTimestamp(second.date) - getTimestamp(first.date))
      .map(article => ({
        title: article.title,
        path: article.path,
      }))
  })

  return {
    activeTag,
    tagNavigation,
  }
}
