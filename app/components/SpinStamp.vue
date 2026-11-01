<template>
  <NuxtLink to="/contact" class="relative block size-32 lg:size-36" :aria-label="text">
    <motion.svg viewBox="0 0 120 120" class="size-full text-rose-ink" :style="{ rotate }">
      <defs>
        <path id="stamp-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
      </defs>
      <text class="fill-current font-mono text-[9.6px] tracking-[0.1em] uppercase">
        <textPath href="#stamp-circle">{{ text }} • {{ text }} •</textPath>
      </text>
    </motion.svg>
    <span class="absolute inset-0 m-auto size-3.5 bg-green-500">
      <span class="absolute inset-0 animate-ping bg-green-500" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { motion, useScroll, useTransform } from "motion-v";

defineProps<{ text: string }>();

// The stamp turns as the page scrolls.
const { scrollY } = useScroll();
const rotate = useTransform(scrollY, (value) => value / 4);
</script>
