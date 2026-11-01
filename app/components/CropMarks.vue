<template>
  <div class="pointer-events-none absolute inset-2 text-foreground/40 md:inset-3" aria-hidden="true">
    <svg
      v-for="corner in corners"
      :key="corner"
      :class="['absolute size-4', corner]"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
    >
      <path d="M0 .5h16M.5 0v16" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const corners = [
  "top-0 left-0",
  "top-0 right-0 -scale-x-100",
  "bottom-0 left-0 -scale-y-100",
  "bottom-0 right-0 -scale-100",
];
</script>
