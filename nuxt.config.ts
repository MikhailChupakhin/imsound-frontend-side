// https://nuxt.com/docs/api/configuration/nuxt-config
// Nuxt 3.10

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  pages: true,
  modules: [
    'nuxt-primevue',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  primevue: true,
  css: [
    '~/assets/global.css'
  ],
  plugins: [
    '~/plugins/baseDataUpdater.server.js',
    '~/plugins/directives.js'
  ],
  runtimeConfig: {
    public: {
      apiBase: '',
      apiMedia: '',
      brandName: process.env.NUXT_PUBLIC_BRANDNAME || '',
    }
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Sofia+Sans': true,
    }
  }
})
