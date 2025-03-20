<template>
  <div class="relative !font-sans min-h-dvh flex flex-col">
    <Header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
    <NoiseTexture />
  </div>
</template>

<script setup>
const { store } = useColorMode();
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
body {
  font-family: Gabarito, sans-serif;
}
</style>
