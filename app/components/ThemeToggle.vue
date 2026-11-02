<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isDark"
    aria-label="Dark theme"
    class="slug flex items-center gap-2"
    @click="toggleTheme"
  >
    <span class="dark:text-muted-foreground">Paper</span>
    <span class="flex h-4 w-8 border border-foreground p-px">
      <span class="size-3 bg-primary transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none dark:translate-x-4" />
    </span>
    <span class="text-muted-foreground dark:text-foreground">Ink</span>
  </button>
</template>

<script setup lang="ts">
import { useMounted } from "@vueuse/core";

// The look comes from the `dark` class, which theme-loader.js sets before the
// page paints. Pages are prerendered without knowing the visitor's theme, so
// anything rendered from the saved theme has to wait until after hydration.
const { current, toggleTheme } = useThemeSwitch();
const mounted = useMounted();
const isDark = computed(() => !mounted.value || current.value === "dark");
</script>
