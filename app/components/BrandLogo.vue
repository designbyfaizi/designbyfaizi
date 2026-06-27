<script setup lang="ts">
import bullet from "@/assets/brands/bullet-flughafentransfer.svg?raw";
import mano from "@/assets/brands/mano-animation-studios.svg?raw";
import imrooz from "@/assets/brands/imrooz.svg?raw";

type BrandName = "bullet" | "mano" | "imrooz";

const props = defineProps<{
  name: BrandName;
  alt?: string;
}>();

const svgs: Record<BrandName, string> = {
  bullet,
  mano,
  imrooz,
};

const svgHtml = computed(() => svgs[props.name]);
</script>

<template>
  <div class="brand-logo" role="img" :aria-label="alt" v-html="svgHtml" />
</template>

<style scoped>
.brand-logo :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
