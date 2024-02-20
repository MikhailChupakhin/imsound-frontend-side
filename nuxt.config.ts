// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  pages: true,
  modules: [
    'nuxt-primevue',
  ],
  primevue: true,
  css: [
    '~/assets/global.css'
  ],
  runtimeConfig: {
    public: {
      apiBase: '',
    }
  },
})
