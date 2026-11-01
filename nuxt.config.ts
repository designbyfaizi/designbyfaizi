import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  runtimeConfig: {
    public: {
      site_url: process.env.SITE_URL!,
      email: "faizanullah1999@gmail.com",
      google_sheets_url: process.env.GOOGLE_SHEETS_URL!,
    },
    api_url: process.env.API_URL!,
    api_key: process.env.API_KEY!,
  },
  modules: [
    // "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "reka-ui/nuxt",
    "motion-v/nuxt",
    "@nuxt/content",
    "@nuxt/fonts",
    "shadcn-nuxt",
  ],
  fonts: {
    families: [
      {
        name: "Outfit",
        provider: "google",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal"],
      },
    ],
  },
  css: ["@/assets/styles/main.css"],
  nitro: {
    compatibilityDate: "2024-11-01",
  },
  image: {
    domains: [process.env.SITE_URL || "http://localhost:3000"],
  },
  components: [
    {
      path: "@/components",
      pathPrefix: true,
    },
    {
      path: "@/components/ui",
      pathPrefix: false,
    },
  ],
  vite: {
    server: {
      allowedHosts: true,
    },
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});
