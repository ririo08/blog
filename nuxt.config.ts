// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: { enabled: true },
  app: {
    baseURL: '/blog/',
  },

  css: [
    '@/assets/css/tailwind.css',
  ],

  routeRules: {
    '/': { prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-06-17',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
