export default defineNuxtPlugin((nuxtApp) => {
    const colorMode = useColorMode();
    const colorModes = [
        "system",
        "light",
        "dark",
        // "sepia",
        // "cyan",
        // "green",
        // "purple",
    ];
    const isDarkMode = computed(() => colorMode.value === "dark" ? true : false);
    const switchTheme = () => {
        for (let i = 0; i < colorModes.length; i++) {
            if (colorMode.preference === colorModes[i]) {
                return (colorMode.preference =
                    colorModes[(i % (colorModes.length - 1)) + 1]);
            }
        }
    };
    return {
        provide: {
            colorModes,
            isDarkMode,
            switchTheme,
        },
    };
});
