<template>
  <div class="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
    <div ref="rosePlate" class="absolute inset-0 bg-primary" style="transform: scaleY(0)" />
    <div ref="inkPlate" class="absolute inset-0 bg-foreground" style="transform: scaleY(0)" />
  </div>
</template>

<script setup lang="ts">
import { animate } from "motion-v";
import { press } from "@/lib/motion";

const rosePlate = useTemplateRef("rosePlate");
const inkPlate = useTemplateRef("inkPlate");

const motionOff = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const sweep = async (origin: string, from: number, to: number, order: (HTMLElement | null)[]) => {
  await Promise.all(
    order.map((plate, index) => {
      if (!plate) return undefined;
      plate.style.transformOrigin = origin;
      return animate(
        plate,
        { scaleY: [from, to] },
        { duration: 0.38, delay: index * 0.07, ease: press },
      ).finished;
    }),
  );
};

const cover = async () => {
  if (motionOff()) return;
  await sweep("bottom", 0, 1, [rosePlate.value, inkPlate.value]);
};

const reveal = async () => {
  if (motionOff()) return;
  await sweep("top", 1, 0, [inkPlate.value, rosePlate.value]);
};

defineExpose({ cover, reveal });
</script>
