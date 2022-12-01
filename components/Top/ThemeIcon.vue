<template>
    <div
        @click="$switchTheme"
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
        class="h-[36px] min-w-[36px] sm:h-[50px] sm:min-w-[50px] px-2 active:scale-95 bg-background rounded-full cursor-pointer group flex items-center gap-2 transition-all duration-100"
        :class="!hovered && 'aspect-square'"
    >
        <Icon
            :key="$isDarkMode"
            :name="$isDarkMode ? moonyIcon : sunnyIcon"
            class="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] text-neutral-600 group-hover:text-primary"
        />
        <p v-if="hovered" class="select-none transition-all duration-100 mr-2">
            {{
                $isDarkMode
                    ? `Dark`
                    : `Light`
            }}
        </p>
    </div>
</template>

<script setup lang="ts">
const { $switchTheme, $isDarkMode } = useNuxtApp();
// const colorMode = useColorMode();
const sunnyIcon = "line-md:moon-filled-to-sunny-filled-loop-transition";
const moonyIcon = "line-md:moon-filled-loop";

const hovered = useState("hovered", () => false);
</script>
