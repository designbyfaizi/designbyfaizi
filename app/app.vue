<template>
  <div id="app" class="relative min-h-dvh flex flex-col">
    <Header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
    <NoiseTexture class="opacity-50" />
  </div>
</template>
<script setup>
useHead({
  script: [
    {
      src: "/theme-loader.js",
      async: false, // Ensures it runs before rendering
    },
  ],
});
</script>

<style>
/* #app {
  font-family: var(--font-family) !important;
  font-weight: 400;

  .font-sans {
    font-family: var(--font-family);
  }
  .font-manrope {
    font-family: "Manrope";
  }
} */
</style>
