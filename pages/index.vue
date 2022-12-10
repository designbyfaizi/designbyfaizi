<template>
    <HomeHeroSection />
    <HomeHeroSection />
</template>

<script setup lang="ts">
useHead({
    title: "Design by Faizi",
    meta: [{ name: "description", content: "My Amazing Site!" }],
});

definePageMeta({
    layout: "main-layout",
});
</script>
