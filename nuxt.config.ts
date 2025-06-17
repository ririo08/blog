// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  extends: 'content-wind',

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
  ],

  devtools: { enabled: true },
  app: {
    baseURL: '/blog/',
  },
  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2024-12-10',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
