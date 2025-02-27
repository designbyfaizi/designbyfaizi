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
  if (process.client) {
    const savedMode = localStorage.getItem("vueuse-color-scheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedMode === "dark" || (!savedMode && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
</script>
