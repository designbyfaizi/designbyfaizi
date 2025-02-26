<template>
  <div class="noise-texture-container">
    <div class="noise-texture"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.noise-texture-container {
  inset: 0px;
  position: fixed;
  z-index: 10;
  pointer-events: none;

  .noise-texture {
    width: 100%;
    height: 100%;
    background-size: 109px;
    background-repeat: repeat;
    background-image: url("/noise-texture.png");
    opacity: 0.06;
    border-radius: 0px;
    pointer-events: none;
  }
}
</style>
