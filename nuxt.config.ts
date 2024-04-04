// https://nuxt.com/docs/api/configuration/nuxt-config
// Nuxt 3.10

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  pages: true,
  modules: [
    'nuxt-primevue',
    '@pinia/nuxt',
  ],
  primevue: true,
  css: [
    '~/assets/global.css'
  ],
  plugins: [
    '~/plugins/baseDataUpdater.server.js',
  ],
  runtimeConfig: {
    public: {
      apiBase: '',
      apiMedia: '',
      brandName: process.env.NUXT_PUBLIC_BRANDNAME || '',
    }
  },
})
