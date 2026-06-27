
type Theme = {
    name: ThemeName;
    icon: string;
    class: string
}

const themes: Theme[] = [
    {
        name: "light",
        icon: "mdi:white-balance-sunny",
        class: "col-span-1"
    },
    {
        name: "dark",
        icon: "mdi:moon-waning-crescent",
        class: "col-span-1"
    },
]

import { onMounted } from "vue";

export const useTheme = () => {
    const { store } = useColorMode();

    const setTheme = (newTheme: ThemeName) => {
        store.value = themes.find(theme => theme.name === newTheme)?.name ?? currentTheme.value.name
    }

    const toggleTheme = () => {
        const nextIndex = (currentThemeIndex.value + 1) % themes.length
        store.value = (themes as Theme[])[nextIndex]?.name!
    }

    onMounted(() => {
        if (!themes.some(theme => theme.name === store.value)) {
            store.value = "light"
        }
    })

    const currentThemeIndex = computed(() => {
        return themes.findIndex(icon => icon.name === store.value)
    })

    const currentTheme = computed(() => {
        const _currentTheme = themes[currentThemeIndex.value]
        if (_currentTheme?.name) {
            return _currentTheme as Theme
        }
        return themes[0] as Theme
    })

    return {
        themes,
        currentThemeIndex,
        currentTheme,
        store,
        toggleTheme,
        setTheme,
    }
}