<template>
  <component :is="as" class="relative inline-block">
    <motion.span
      data-enter
      aria-hidden="true"
      class="absolute inset-0 block text-primary select-none"
      :initial="{ opacity: 0, x: -48, y: 32 }"
      :animate="{ opacity: 1, x: 0, y: 0 }"
      :transition="{ ...gentle, delay: delay + 0.25 }"
    >
      <motion.span class="block before:content-[attr(data-plate)]" :data-plate="text" :style="{ x, y }" />
    </motion.span>
    <span class="relative block overflow-hidden pt-[0.06em] -mt-[0.06em]">
      <motion.span
        data-enter
        class="block"
        :initial="{ y: '105%' }"
        :animate="{ y: '0%' }"
        :transition="{ duration: 0.8, delay, ease: press }"
      >{{ text }}</motion.span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { gentle, press } from "@/lib/motion";

const props = withDefaults(
  defineProps<{ text: string; as?: string; delay?: number; plate?: number }>(),
  { as: "span", delay: 0, plate: 5 },
);

const { x, y } = useRegistration(props.plate, props.plate * 1.8);
</script>
