<template>
  <div
    ref="sheet"
    class="relative overflow-hidden bg-primary select-none [-webkit-touch-callout:none]"
    @pointerenter="(event) => event.pointerType !== 'touch' && radius.set(RADIUS)"
    @pointermove="(event) => event.pointerType !== 'touch' && develop(event)"
    @pointerleave="(event) => event.pointerType !== 'touch' && radius.set(0)"
    @contextmenu="(event) => touching && event.preventDefault()"
  >
    <div class="absolute inset-0 mix-blend-multiply">
      <div class="halftone size-full">
        <!-- Same size and format as the picture below, so the browser fetches it once. -->
        <NuxtImg format="webp" :src="src" alt="" width="800" loading="lazy" draggable="false" />
      </div>
    </div>
    <motion.div class="absolute inset-0" :style="{ clipPath }">
      <NuxtImg format="webp" :src="src" :alt="alt" width="800" draggable="false" class="size-full object-cover" />
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion-v";
import { useEventListener } from "@vueuse/core";

defineProps<{ src: string; alt: string }>();

const RADIUS = 150;
// A finger must rest this long before the lens opens, so a swipe still scrolls the page.
const HOLD_MS = 250;
// Moving further than this before the hold completes counts as a scroll.
const SLOP_PX = 10;

const sheet = useTemplateRef("sheet");
const x = useMotionValue(0);
const y = useMotionValue(0);
const radius = useMotionValue(0);
const size = useSpring(radius, { stiffness: 180, damping: 22 });
const clipPath = useMotionTemplate`circle(${size}px at ${x}px ${y}px)`;

const develop = (point: { clientX: number; clientY: number }) => {
  const box = sheet.value!.getBoundingClientRect();
  x.set(point.clientX - box.left);
  y.set(point.clientY - box.top);
};

// Touch: press and hold to open the lens, then drag it around while the page stays put.
const touching = ref(false);
let developing = false;
let hold: ReturnType<typeof setTimeout> | undefined;
let start = { clientX: 0, clientY: 0 };

const stop = () => {
  clearTimeout(hold);
  if (developing) radius.set(0);
  developing = false;
  touching.value = false;
};

useEventListener(sheet, "touchstart", (event: TouchEvent) => {
  if (event.touches.length !== 1) return stop();
  const { clientX, clientY } = event.touches[0]!;
  start = { clientX, clientY };
  touching.value = true;
  hold = setTimeout(() => {
    developing = true;
    develop(start);
    radius.set(RADIUS);
  }, HOLD_MS);
}, { passive: true });

useEventListener(sheet, "touchmove", (event: TouchEvent) => {
  const point = event.touches[0]!;
  if (!developing) {
    // Moved before the hold finished: it's a scroll, so let the browser have it.
    if (Math.hypot(point.clientX - start.clientX, point.clientY - start.clientY) > SLOP_PX) stop();
    return;
  }
  // Holding: the finger steers the lens instead of scrolling the page.
  if (event.cancelable) event.preventDefault();
  develop(point);
}, { passive: false });

useEventListener(sheet, "touchend", stop);
useEventListener(sheet, "touchcancel", stop);
</script>
