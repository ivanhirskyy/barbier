// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      SUPABASE_URL: process.env.NUXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
  devtools: {
    enabled: false,
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/strapi',
    '@nuxt/ui',
    '@nuxt/image',
    'nuxt-swiper',
    '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/supabase',
  ],
  swiper: {
    modules: ['autoplay'],
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    redirect: false,
  },
  strapi: {
    url: process.env.NUXT_PUBLIC_API_BASE_URL,
    /* cookieName: 'strapi_jwt', */
    cookie: {
      path: '/',
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
    },
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
