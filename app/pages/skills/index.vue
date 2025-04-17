<template>
  <main class="space-y-4 content-grid">
    <GeneralHeroSection title="Skills">
      <p class="">
        {{ description }}
      </p>
    </GeneralHeroSection>
    <section class="skills-section flex flex-col">
      <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !data">
        {{ "Uh-oh! Some Error occured.💀 Check server logs!" }}
      </div>
      <SkillCategories v-else :categories="data" />
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data, status, error } = await useAsyncData("skills", () =>
  queryCollection("skill").order("name", "DESC").all()
);

const config = useRuntimeConfig();
const title = "Skills - Design By Faizi";
const description =
  "A curated list of technologies, tools, and frameworks I use to build seamless digital experiences.";

  useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  ogUrl: config.public.site_url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  twitterCard: "summary_large_image",
});
</script>

<style></style>
