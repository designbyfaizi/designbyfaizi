import { readdirSync, readFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";

// Skill icons are named in the content files, so collect them here to ship
// them with the site. Icons from any other set still load from Iconify.
const iconSets = [
  "devicon",
  "logos",
  "material-icon-theme",
  "simple-icons",
  "skill-icons",
  "vscode-icons",
  "mdi",
  "ic",
  "lucide",
];
const skillIcons = readdirSync("content/skills").flatMap((file) =>
  [...readFileSync(`content/skills/${file}`, "utf8").matchAll(/icon:\s*["']?([\w-]+:[\w-]+)/g)]
    .map((match) => match[1]!)
    .filter((icon) => iconSets.includes(icon.split(":")[0]!)),
);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-01",
  devtools: { enabled: false },
  // The About page was removed from the site.
  ignore: ["**/pages/about.vue"],
  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "motion-v/nuxt",
    "shadcn-nuxt",
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss() as any],
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      script: [{ src: "/theme-loader.js" }],
    },
  },
  runtimeConfig: {
    // Set on the server with NUXT_SMTP_USER and NUXT_SMTP_PASSWORD, see EDITING.md.
    smtp: {
      host: "smtp.gmail.com",
      port: 465,
      user: "",
      password: "",
      to: "",
    },
    public: { siteUrl: "https://designbyfaizi.com" },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      ignore: ["ui/**", "SpotlightCard.vue", "ThemePicker.vue"],
    },
  ],
  shadcn: {
    prefix: "",
    componentDir: "~/components/ui",
  },
  content: {
    experimental: { sqliteConnector: "bun" },
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: { default: "github-light", dark: "github-dark" },
          langs: ["html", "css", "js", "ts", "vue", "bash", "json", "yaml"],
        },
      },
    },
  },
  icon: {
    mode: "svg",
    provider: "iconify",
    serverBundle: { collections: iconSets },
    clientBundle: {
      icons: [...new Set(skillIcons)],
      scan: true,
    },
  },
  routeRules: {
    // Resized images have no hash in their URL, so they are cached for 30 days rather
    // than forever: a replaced picture shows up after that.
    "/_ipx/**": { headers: { "cache-control": "public, max-age=2592000" } },
  },
  image: {
    quality: 80,
    format: ["webp"],
  },
  nitro: {
    preset: "bun",
    // Every page is prerendered, so build-time brotli and gzip copies cover the HTML,
    // payloads, scripts and styles. Nitro serves them to browsers that accept them.
    // Nothing in front of the app compresses: Traefik (Dokploy) passes responses through.
    compressPublicAssets: { gzip: true, brotli: true },
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sitemap.xml", "/feed.xml", "/404.html"],
      ignore: ["/api"],
    },
  },
});
