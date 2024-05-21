// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      STRAPI_JWT: process.env.STRAPI_JWT,
    },
  },
  modules: ['@vueuse/nuxt', '@nuxtjs/strapi', '@nuxt/ui', '@nuxt/image'],
  strapi: {
    url: process.env.NUXT_PUBLIC_API_BASE_URL,
    cookieName: 'strapi_jwt',
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      htmlAttrs: {
        lang: 'pt',
      },
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
  },
  components: {
    global: true,
    dirs: ['~/components/'],
  },
});
