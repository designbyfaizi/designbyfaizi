import unocss from "./unocss.config";
import { colorMode } from "./configs/colorMode.config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        // pageTransition: { name: "page", mode: "out-in" },
        // layoutTransition: { name: "layout", mode: "out-in" },
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },
    ssr: true,
    css: [
        "@/assets/styles/reset.css",
        "@/assets/styles/colors.css",
        "@/assets/styles/fonts.css",
        "@/assets/styles/scrollbar.css",
        "@/assets/styles/main.css",
    ],
    modules: [
        "@vueuse/nuxt",
        "@unocss/nuxt",
        "@nuxtjs/color-mode",
        "@nuxt/image",
        "nuxt-icon",
        "@nuxt/content",
        "@nuxthq/studio",
        "@pinia/nuxt",
    ],
    unocss,
    postcss: {
        plugins: {
            "@unocss/postcss": {},
        },
    },
    colorMode,
    devtools: { enabled: true },
});
