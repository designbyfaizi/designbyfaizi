<template>
  <div class="flex gap-4 p-4">
    <button
      v-for="(tab, index) in tabs"
      :key="tab.name"
      @click="activeTab = tab"
      class="px-10 py-2 relative rounded border border-transparent hover:border-white/10"
    >
      <span class="relative z-2">
        {{ tab?.name }}
      </span>
      <motion.span
        v-if="activeTab?.name === tab?.name"
        layout-id="underline"
        class="absolute z-1 rounded inset-0 bg-foreground/10 backdrop-blur-md"
      ></motion.span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";
const tabs = [
  {
    name: "Hello 1",
  },
  {
    name: "Hello 2",
  },
  {
    name: "Hello 3",
  },
  {
    name: "Hello. This is a long ass tab.",
  },
];
const activeTab = ref(tabs[0]);
</script>

<style></style>
