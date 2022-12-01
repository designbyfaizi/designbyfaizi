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
            "primaryLighter": "rgb(var(--primary-lighter))",
            "primaryLight": "rgb(var(--primary-light))",
            "primaryDark": "rgb(var(--primary-dark))",
            "primaryDarker": "rgb(var(--primary-darker))",
            background: "rgb(var(--background))",
            backgroundsecond: "rgb(var(--backgroundsecond))",
            shadow: "rgb(var(--shadow))",
        },
    },
};

export default unocss;
