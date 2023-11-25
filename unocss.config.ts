import { type UnocssNuxtOptions } from "@unocss/nuxt";
import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { theme } from "@unocss/preset-wind";

const unocss: UnocssNuxtOptions = {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    // icons: true, // enabled `@unocss/preset-icons`
    // core options
    shortcuts: {
        "sada-container": "max-w-[512px] mx-[10px] sm:mx-auto",
    },
    rules: [
        ["font-tanker", { "font-family": "Tanker" }],
        ["font-satoshi", { "font-family": "Satoshi" }],
        ["font-ubuntu", { "font-family": "Ubuntu" }],
    ],
    theme: {
        colors: {
            ...theme?.colors,
            main: "var(--main)",
            primary: "var(--primary)",
            primaryLighter: "var(--primary-lighter)",
            primaryLight: "var(--primary-light)",
            primaryDark: "var(--primary-dark)",
            primaryDarker: "var(--primary-darker)",
            background: "var(--background)",
            backgroundSecond: "var(--background-second)",
            backgroundLight: "var(--background-light)",
            backgroundLighter: "var(--background-lighter)",
            shadow: "var(--shadow)",
            test: "blue",
        },
    },
    transformers: [transformerDirectives() as any, transformerVariantGroup()],
};

export default unocss;
