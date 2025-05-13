<template>
  <NuxtLink to="/" class="p-2 aqler-press relative">
    <NuxtImg
      src="/img/designbyfaizi-logo.svg"
      alt="Design By Faizi"
      class="size-[32px] relative z-2"
      width="32"
      height="32"
    />
    <motion.div
      v-if="$route.path === '/'"
      layout-id="nav-link-underline"
      class="bg-foreground/5 rounded-full absolute inset-0 z-1"
    >
    </motion.div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";
</script>

<style></style>
