<template>
  <main class="content-grid flex-1 flex flex-col">
    <HomeHeroSection />
    <HomeDescriptionSection />
    <HomeClientsSection />
    <HomeSkillsSection />
  </main>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
  ogTitle: data.value?.title,
  ogDescription: data.value?.description,
  ogImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  ogUrl: config.public.site_url,
  twitterTitle: data.value?.title,
  twitterDescription: data.value?.description,
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
