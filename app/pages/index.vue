<template>
  <main class="flex-1 flex flex-col">
    <HomeHeroSection />
    <HomeDescriptionSection />
    <HomeClientsSection />
    <section class="aqler-container mt-[100px]">
    <div class="grid grid-cols-12 gap-4">
    <PixelCard v-for="card in 3" class="col-span-4" />
    
    </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const title = "Design By Faizi";
const description =
  "I am a frontend developer and UI/UX designer, crafting sleek and scalable web experiences.";
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  ogUrl: config.public.site_url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  twitterCard: "summary_large_image",
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});


</script>
