<template>
  <NuxtImg
    v-if="src"
    format="webp"
    :src="src"
    :alt="title"
    width="1000"
    loading="lazy"
    :class="['aspect-video w-full object-cover', $attrs.class]"
  />
  <div
    v-else
    :class="['relative flex aspect-video w-full items-end overflow-hidden bg-primary p-4 text-ink', $attrs.class]"
    role="img"
    :aria-label="title"
  >
    <div class="dots absolute inset-0" />
    <span class="display relative text-[22cqw] leading-none">{{ title.charAt(0) }}</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineProps<{ src?: string; title: string }>();
</script>

<style scoped>
.dots {
  background-image: radial-gradient(circle, var(--color-ink) 28%, transparent 30%);
  background-size: 14px 14px;
  mask-image: linear-gradient(120deg, transparent 25%, black 100%);
}
</style>
