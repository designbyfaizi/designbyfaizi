<template>
  <p ref="block" class="font-serif text-4xl leading-[1.1] md:text-6xl lg:text-7xl">
    <template v-for="(word, index) in words" :key="index">
      <InkWord :word="word" :index="index" :total="words.length" :progress="scrollYProgress" />{{ " " }}
    </template>
  </p>
</template>

<script setup lang="ts">
import { useScroll } from "motion-v";

const props = defineProps<{ text: string }>();

const block = useTemplateRef("block");
const words = computed(() => props.text.split(" "));

// Each word takes the ink as it scrolls through the reading zone.
const { scrollYProgress } = useScroll({ target: block, offset: ["start 85%", "end 55%"] });
</script>
