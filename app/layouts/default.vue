<template>
  <div class="flex flex-col gap-4 flex-1 grid-bg">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style>
/* .grid-bg {

  --charcoal: var(--foreground);
  background-image: repeating-linear-gradient(
      to right,
      var(--charcoal),
      var(--charcoal) 1px,
      transparent 1px,
      transparent 30px
    ),
    repeating-linear-gradient(
      to bottom,
      var(--charcoal),
      var(--charcoal) 1px,
      transparent 1px,
      transparent 30px
    );
} */
</style>
