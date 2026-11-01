<template>
  <NuxtLink to="/" class="group flex items-center gap-2.5" aria-label="Design By Faizi, home">
    <motion.img
      src="/img/designbyfaizi-logo.svg"
      alt=""
      width="28"
      height="28"
      class="size-7"
      :while-hover="{ rotate: -12, scale: 1.12 }"
      :transition="snappy"
    />
    <span class="slug hidden sm:block">Design By Faizi</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { snappy } from "@/lib/motion";
</script>
