<template>
  <svg
    ref="mark"
    class="pointer-events-none absolute -inset-[6%] size-[112%] text-primary"
    viewBox="0 0 100 100"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <motion.path
      d="M50 4C24 3 5 19 4 48c-1 30 20 48 47 48 27 0 46-19 45-48C95 21 76 5 46 6c-9 0-17 3-23 7"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      vector-effect="non-scaling-stroke"
      :initial="{ pathLength: 0 }"
      :animate="seen ? { pathLength: 1 } : { pathLength: 0 }"
      :transition="{ duration: 0.9, ease: 'easeInOut', delay }"
    />
  </svg>
</template>

<script setup lang="ts">
import { motion, useInView } from "motion-v";

withDefaults(defineProps<{ delay?: number }>(), { delay: 0.2 });

// Circled by hand, the way a designer marks picks on a contact sheet.
const mark = useTemplateRef("mark");
const seen = useInView(mark, { once: true, amount: 0.4 });
</script>
