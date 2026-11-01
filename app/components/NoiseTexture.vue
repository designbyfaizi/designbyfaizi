<template>
  <div class="paper-grain pointer-events-none fixed inset-0 z-30" aria-hidden="true" />
</template>

<style>
.paper-grain {
  background-image: url("/noise-texture.png");
  background-size: 180px;
  mix-blend-mode: multiply;
  opacity: 0.045;
}

.dark .paper-grain {
  mix-blend-mode: screen;
  opacity: 0.04;
}
</style>
