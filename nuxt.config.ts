// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  site: {
    url: process.env.SITE_URL!,
    name: "Design By Faizi"
  },
  runtimeConfig: {
    public: {
      site_url: process.env.SITE_URL!,
      email: 'faizanullah1999@gmail.com'
    },
    api_url: process.env.API_URL!,
    api_key: process.env.API_KEY!,
    notionSecret: process.env.NOTION_SECRET!,
    notionSkillsId: process.env.NOTION_SKILLS_ID!,
    notionKnowledgeHubId: process.env.NOTION_KNOWLEDGE_HUB_ID!,
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
    'nuxt-og-image',
    '@nuxt/fonts'
  ],
  css: [
    "@/assets/styles/main.css"
  ],
  routeRules: {
    "/skills": { isr: true },
    "/skills/**": { isr: true },
    "/knowledge-hub": { isr: true },
    "/knowledge-hub/**": { isr: true },
  },
  devtools: { enabled: true },
  nitro: {
    compatibilityDate: '2024-11-01',
    preset: "cloudflare-pages"
  },
  image: {
    domains: [
      "designbyfaizi.pages.dev",
      "designbyfaizi.com"
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
  ]
})