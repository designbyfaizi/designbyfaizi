import { UnocssNuxtOptions } from "@unocss/nuxt";

const unocss: UnocssNuxtOptions = {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    // icons: true, // enabled `@unocss/preset-icons`
    // core options
    shortcuts: [],
    rules: [],
    theme: {
        colors: {
            main: "rgb(var(--main))",
            primary: "rgb(var(--primary))",
            secondary: "rgb(var(--secondary))",
            background: "rgb(var(--background))",
            backgroundsecond: "rgb(var(--backgroundsecond))",
            shadow: "rgb(var(--shadow))",
        },
    },
};

export default unocss;
