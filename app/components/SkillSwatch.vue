<template>
  <motion.div
    class="group relative flex aspect-square flex-col justify-between overflow-hidden border-r border-b p-2.5 md:p-3"
    while-hover="hover"
  >
    <span class="absolute inset-x-0 bottom-0 h-0 bg-primary transition-[height] duration-300 ease-out group-hover:h-full" />
    <motion.span class="relative flex self-start" :variants="wiggle">
      <Icon :name="tool.icon" class="size-7 md:size-8" />
    </motion.span>
    <span class="slug relative text-[0.625rem] leading-tight normal-case tracking-normal transition-colors group-hover:text-ink">{{ tool.name }}</span>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from "motion-v";

defineProps<{ tool: { name: string; icon: string } }>();

const wiggle = {
  hover: { rotate: [0, -10, 8, 0], scale: 1.2, transition: { duration: 0.45 } },
};
</script>
