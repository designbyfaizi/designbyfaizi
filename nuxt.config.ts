import unocss from "./unocss.config";
import { colorMode } from "./modules/colorMode.config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    css: [
        "@/assets/styles/reset.scss",
        "@/assets/styles/fonts.scss",
        "@/assets/styles/colors.scss",
        "@/assets/styles/scrollbar.scss",
        "@/assets/styles/main.scss",
    ],
    modules: [
        "@vueuse/nuxt",
        "@unocss/nuxt",
        "@nuxtjs/color-mode",
        "@nuxt/image-edge",
        "nuxt-icon",
    ],
    unocss,
    colorMode,
});
