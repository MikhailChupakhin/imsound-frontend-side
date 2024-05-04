// https://nuxt.com/docs/api/configuration/nuxt-config
// Nuxt 3.10

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Интернет-магазин световой техники и музыкальной аппаратуры Imsound.ru',
      meta: [
        { name: 'description', content: 'Купить профессиональное сценическое и концертное оборудование Imsound.ru'},
        { property: 'og:title', content: 'Интернет-магазин световой техники и музыкальной аппаратуры Imsound.ru' },
        { property: 'og:description', content: 'Купить профессиональное сценическое и концертное оборудование Imsound.ru' },
        { property: 'og:image', content: 'https://imsound-frontend-side.vercel.app/_nuxt/hotline.KtnH6B1A.webp' },
        { name: 'twitter:title', content: 'Интернет-магазин световой техники и музыкальной аппаратуры Imsound.ru' },
        { name: 'twitter:description', content: 'Купить профессиональное сценическое и концертное оборудование Imsound.ru' },
        { name: 'twitter:image', content: 'https://imsound-frontend-side.vercel.app/_nuxt/hotline.KtnH6B1A.webp' },
      ],
    },
  },
  devtools: { enabled: true },
  ssr: false,
  pages: true,
  modules: ['nuxt-primevue', '@pinia/nuxt', '@nuxtjs/google-fonts', "@nuxt/image"],
  primevue: true,
  image: {
    inject: true
  },
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