<template>
  <section class="rounded-md general-hero-section py-10">
    <div class="relative flex flex-col gap-4 z-2">
      <div class="flex flex-col lg:flex-row gap-4">
        <slot name="pre" />
        <h1 class="max-w-screen-sm font-bold text-3xl lg:text-5xl">{{ title }}</h1>
      </div>
      <slot>Cooking...</slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style>
.general-hero-section {
  position: relative;
  z-index: 2;
}
.general-hero-section:before {
  content: "";
  background: radial-gradient(hsla(var(--card-foreground), 0.9) 8%, transparent 8%);
  background-position: 0% 0%;
  background-size: 2vmin 2vmin;
  width: 100%;
  height: 100%;
  transition: background-position 350ms ease;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 1;
}
</style>
