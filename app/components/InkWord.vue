<template>
  <motion.span :style="{ opacity }">{{ word }}</motion.span>
</template>

<script setup lang="ts">
import type { MotionValue } from "motion-v";
import { motion, useTransform } from "motion-v";

const props = defineProps<{
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}>();

const start = props.index / props.total;
const opacity = useTransform(props.progress, [start, start + 2 / props.total], [0.14, 1]);
</script>
