<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isDark"
    aria-label="Dark theme"
    class="slug flex items-center gap-2"
    @click="toggleTheme"
  >
    <span :class="isDark ? 'text-muted-foreground' : ''">Paper</span>
    <span :class="['flex h-4 w-8 border border-foreground p-px', isDark ? 'justify-end' : 'justify-start']">
      <motion.span layout class="size-3 bg-primary" :transition="snappy" />
    </span>
    <span :class="isDark ? '' : 'text-muted-foreground'">Ink</span>
  </button>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { snappy } from "@/lib/motion";

const { current, toggleTheme } = useThemeSwitch();
const isDark = computed(() => current.value === "dark");
</script>
