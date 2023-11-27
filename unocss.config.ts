import { type UnocssNuxtOptions } from "@unocss/nuxt";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";

const unocss: UnocssNuxtOptions = {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    // icons: true, // enabled `@unocss/preset-icons`
    // core options
    shortcuts: {
        "sada-container": "max-w-[512px] w-full mx-[10px] sm:mx-auto",
        "sada-container-lg": "max-w-[540px] w-full mx-[10px] sm:mx-auto",
    },
    rules: [
        ["font-tanker", { "font-family": "Tanker" }],
        ["font-satoshi", { "font-family": "Satoshi" }],
        ["font-ubuntu", { "font-family": "Ubuntu" }],
    ],
    theme: {
        colors: {
            main: "#a3a3a3",
            primary: "#e11948",
            primaryLighter: "#fb7185",
            primaryLight: "#f43f5e",
            primaryDark: "#be123c",
            primaryDarker: "#881337",
            background: "#171717",
            backgroundSecond: "#262626",
            backgroundLight: "#404040",
            backgroundLighter: "#525252",
            shadow: "#737373",
        },
    },
    transformers: [transformerDirectives() as any, transformerVariantGroup()],
};

export default unocss;
