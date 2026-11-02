<template>
  <div
    class="relative overflow-hidden bg-primary"
    @pointermove="develop"
    @pointerenter="radius.set(150)"
    @pointerleave="radius.set(0)"
  >
    <div class="absolute inset-0 mix-blend-multiply">
      <div class="halftone size-full">
        <!-- Same size and format as the picture below, so the browser fetches it once. -->
        <NuxtImg format="webp" :src="src" alt="" width="800" loading="lazy" />
      </div>
    </div>
    <motion.div class="absolute inset-0" :style="{ clipPath }">
      <NuxtImg format="webp" :src="src" :alt="alt" width="800" class="size-full object-cover" />
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion-v";

defineProps<{ src: string; alt: string }>();

const x = useMotionValue(0);
const y = useMotionValue(0);
const radius = useMotionValue(0);
const size = useSpring(radius, { stiffness: 180, damping: 22 });
const clipPath = useMotionTemplate`circle(${size}px at ${x}px ${y}px)`;

const develop = (event: PointerEvent) => {
  const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
  x.set(event.clientX - box.left);
  y.set(event.clientY - box.top);
};
</script>
