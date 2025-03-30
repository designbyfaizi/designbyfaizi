<template>
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>Page not found</div>
</template>

<script lang="ts" setup>
// const { data, status, error } = await useFetch("/api/test");
const { data: home } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
</script>

<style></style>
