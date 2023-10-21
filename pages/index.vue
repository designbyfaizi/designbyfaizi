<template>
    <div>
        <HomeHeroSection />
        <HomeAboutSection />
    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Design by Faizi',
  meta: [
    { name: 'description', content: 'My Amazing Site!' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello Homepage\')' } ]
})

definePageMeta({
    layout: "main-layout",
});

useSeoMeta({
  title: 'Design by Faizi',
  ogTitle: 'Design by Faizi',
  description: `This is Faizan's amazing site`,
  ogDescription: `This is Faizan's amazing site`,
  ogImage: 'https://fireship.io/courses/nextjs/img/featured.webp',
  twitterCard: 'summary_large_image',
})
</script>
