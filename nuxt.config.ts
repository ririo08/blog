// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/blog/'
  },
  modules: ["@nuxt/content", "@nuxt/ui", "@nuxt/eslint"]
})