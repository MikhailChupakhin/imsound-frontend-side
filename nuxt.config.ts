// https://nuxt.com/docs/api/configuration/nuxt-config
// Nuxt 3.10

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Default title',
      meta: [
        {
          name: 'description',
          content: 'Default description',
        },
        { property: 'og:title', content: 'Заголовок страницы' },
        { property: 'og:description', content: 'Описание страницы' },
        { property: 'og:image', content: 'https://imsound-frontend-side.vercel.app/_nuxt/hotline.KtnH6B1A.webp' },
        { name: 'twitter:title', content: 'Заголовок страницы' },
        { name: 'twitter:description', content: 'Описание страницы' },
        { name: 'twitter:image', content: 'https://imsound-frontend-side.vercel.app/_nuxt/hotline.KtnH6B1A.webp' },
      ],
    },
  },
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
  },
})
