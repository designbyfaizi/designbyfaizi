<template>
  <div class="flex h-5 w-full" aria-hidden="true">
    <motion.div
      v-for="step in steps"
      :key="step.value"
      :class="['group relative flex-1 origin-bottom', step.color]"
      :while-hover="{ scaleY: 1.8 }"
      :transition="snappy"
    >
      <span class="slug absolute -top-5 left-0 hidden opacity-0 transition-opacity group-hover:opacity-100 md:block">{{ step.value }}</span>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { snappy } from "@/lib/motion";

// The density bar printers run along a sheet, here in Tailwind's rose scale.
const steps = [
  { value: 50, color: "bg-rose-50" },
  { value: 100, color: "bg-rose-100" },
  { value: 200, color: "bg-rose-200" },
  { value: 300, color: "bg-rose-300" },
  { value: 400, color: "bg-rose-400" },
  { value: 500, color: "bg-rose-500" },
  { value: 600, color: "bg-rose-600" },
  { value: 700, color: "bg-rose-700" },
  { value: 800, color: "bg-rose-800" },
  { value: 900, color: "bg-rose-900" },
  { value: 950, color: "bg-rose-950" },
];
</script>
