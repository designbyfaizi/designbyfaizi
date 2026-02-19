// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  runtimeConfig: {
    public: {
      site_url: process.env.SITE_URL!,
      email: 'faizanullah1999@gmail.com',
      google_sheets_url: process.env.GOOGLE_SHEETS_URL!,
    },
    api_url: process.env.API_URL!,
    api_key: process.env.API_KEY!,
  },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    'reka-ui/nuxt',
    'motion-v/nuxt',
    '@nuxt/content',
    '@nuxt/fonts'
  ],
  fonts: {
    families: [
      {
        name: "Cosmic Sans",
        provider: "local",
        src: "/fonts/cosmic/cosmic-sans-vf-regular.ttf",
        weights: [100, 200, 300, 400, 500, 600, 700, 800],
        styles: ["normal"],
      },
      {
        name: "Cosmic Sans Italic",
        provider: "local",
        src: "/fonts/cosmic/cosmic-sans-vf-italic.ttf",
        weights: [100, 200, 300, 400, 500, 600, 700, 800],
        styles: ["italic"],
      }
    ]
  },
  css: [
    "@/assets/styles/main.css"
  ],
  routeRules: {
    "/skills": { isr: true },
    "/skills/**": { isr: true },
    "/blog": { isr: true },
    "/blog/**": { isr: true },
  },
  devtools: { enabled: process.env.ENV === 'DEV' },
  nitro: {
    compatibilityDate: '2024-11-01',
  },
  image: {
    domains: [
      process.env.SITE_URL || 'http://localhost:3000',
    ]
  },
  components: [
    {
      path: "@/components",
      pathPrefix: true
    },
    {
      path: '@/components/ui',
      pathPrefix: false
    }
  ],
  vite: {
    server: {
      allowedHosts: true
    }
  }
})