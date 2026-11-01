<template>
  <component :is="as" :aria-label="text">
    <template v-for="(word, index) in words" :key="index">
      <span aria-hidden="true" class="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
        <motion.span
          data-enter
          class="inline-block"
          :initial="{ y: '110%' }"
          :animate="{ y: '0%' }"
          :transition="{ duration: 0.7, delay: delay + index * 0.05, ease: press }"
        >{{ word }}</motion.span>
      </span>{{ index < words.length - 1 ? " " : "" }}
    </template>
  </component>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { press } from "@/lib/motion";

const props = withDefaults(defineProps<{ text: string; as?: string; delay?: number }>(), {
  as: "p",
  delay: 0,
});

const words = computed(() => props.text.split(" "));
</script>
