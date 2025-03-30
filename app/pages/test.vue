<template>
  <main class="content-grid flex-1 flex flex-col">
    <HomeHeroSection
      :hero_heading="(data?.meta.hero_heading as string)"
      :hero_description="(data?.meta.hero_description as string)"
      :button_text="(data?.meta.button_text as string)"
      button_link="/contact"
    />
    <!-- <ContentRenderer v-if="data" :value="data" />
    <div v-else>Page not found</div> -->
  </main>
</template>

<script lang="ts" setup>
// const { data, status, error } = await useFetch("/api/test");
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/test").first()
);

console.log({ data: data.value });

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>

<style></style>
