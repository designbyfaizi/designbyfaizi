<template>
  <motion.li
    class="group relative mb-1 flex h-full flex-col items-start gap-4 overflow-hidden rounded-xl border border-foreground/10 bg-accent/30 p-4 dark:bg-card"
    :while-hover="{ y: -3 }"
    :transition="snappy"
    @pointermove="follow"
  >
    <motion.div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{ background: glow }"
    />
    <slot />
  </motion.li>
</template>

<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValue } from "motion-v";
import { snappy } from "@/lib/motion";

const x = useMotionValue(0);
const y = useMotionValue(0);
const glow = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, color-mix(in oklab, var(--color-rose-500) 13%, transparent), transparent 70%)`;

const follow = (event: PointerEvent) => {
  const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
  x.set(event.clientX - box.left);
  y.set(event.clientY - box.top);
};
</script>
