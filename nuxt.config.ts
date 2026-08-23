// https://nuxt.com/docs/api/configuration/nuxt-config
const siteOrigin = 'https://ririo08.github.io'
const siteUrl = `${siteOrigin}/blog`

export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxt/eslint'],

  app: {
    baseURL: '/blog/',
  },

  site: {
    name: 'ririo blog',
    url: siteOrigin,
  },

  docus: {
    assistant: {
      enabled: false,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  llms: {
    domain: siteUrl,
  },

  robots: {
    robotsTxt: false,
  },
})
