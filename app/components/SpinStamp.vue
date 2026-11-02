<template>
  <NuxtLink to="/contact" class="relative block size-32 lg:size-36" :aria-label="text">
    <motion.svg viewBox="0 0 120 120" class="size-full text-rose-ink" :style="{ rotate }">
      <defs>
        <path id="stamp-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
      </defs>
      <!-- Spaced out to run exactly once around the ring, whatever the text is. -->
      <text class="fill-current font-mono uppercase" :font-size="FONT_SIZE" :letter-spacing="spacing">
        <textPath href="#stamp-circle">{{ label }}</textPath>
      </text>
    </motion.svg>
    <span class="absolute inset-0 m-auto size-3.5 bg-green-500">
      <span class="absolute inset-0 animate-ping bg-green-500" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { motion, useScroll, useTransform } from "motion-v";

const props = defineProps<{ text: string }>();

// The circle the text follows has a radius of 46. JetBrains Mono gives every
// character the same 0.6em width, so the gap that spreads the text evenly round
// the whole ring can be worked out exactly. Firefox ignores textLength on a
// textPath, which is why this isn't left to the browser.
const FONT_SIZE = 9.6;
const RING = 2 * Math.PI * 46;
// The non-breaking space keeps a gap after the dot, where a plain space would be dropped.
const label = computed(() => `${props.text} •\u00A0`);
const spacing = computed(() => RING / label.value.length - FONT_SIZE * 0.6);

// The stamp turns as the page scrolls.
const { scrollY } = useScroll();
const rotate = useTransform(scrollY, (value) => value / 4);
</script>
