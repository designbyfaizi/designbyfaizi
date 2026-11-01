<template>
  <motion.div
    v-if="enabled"
    aria-hidden="true"
    class="pointer-events-none fixed top-0 left-0 z-[60] text-primary"
    :style="{ x, y, scale, opacity: visible ? 1 : 0 }"
  >
    <svg class="-translate-x-1/2 -translate-y-1/2" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="18" cy="18" r="9" />
      <path d="M18 2v32M2 18h32" />
    </svg>
  </motion.div>
</template>

<script setup lang="ts">
import { motion, useMotionValue, useSpring } from "motion-v";
import { useEventListener } from "@vueuse/core";

// A registration mark follows the pointer and opens up over anything clickable.
const enabled = matchMedia("(pointer: fine)").matches
  && !matchMedia("(prefers-reduced-motion: reduce)").matches;

const rawX = useMotionValue(-100);
const rawY = useMotionValue(-100);
const rawScale = useMotionValue(0.6);
const follow = { stiffness: 700, damping: 40, mass: 0.4 };
const x = useSpring(rawX, follow);
const y = useSpring(rawY, follow);
const scale = useSpring(rawScale, { stiffness: 400, damping: 24 });
const visible = ref(false);

if (enabled) {
  useEventListener(window, "pointermove", (event: PointerEvent) => {
    rawX.set(event.clientX);
    rawY.set(event.clientY);
    visible.value = true;
    const target = event.target as Element | null;
    rawScale.set(target?.closest("a, button, [role='button'], input, textarea, label") ? 1.5 : 0.6);
  });
  useEventListener(document, "pointerleave", () => {
    visible.value = false;
  });
}
</script>
