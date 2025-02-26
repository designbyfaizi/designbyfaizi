// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    notionSecret: process.env.NOTION_SECRET!,
    notionSkillsId: process.env.NOTION_SKILLS_ID!,
  },
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    'reka-ui/nuxt'
  ],
  css: [
    "@/assets/styles/main.css"
  ],
  routeRules: {
    "/skills": { swr: true },
    "/skills/**": { swr: true },
  },
  devtools: { enabled: true },
  nitro: {
    compatibilityDate: '2024-11-01',
    preset: "vercel"
  }
})