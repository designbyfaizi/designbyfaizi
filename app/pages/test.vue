<template>
  <ContentRenderer v-if="data" :value="data" />
  <div v-else>Page not found</div>
</template>

<script lang="ts" setup>
// const { data, status, error } = await useFetch("/api/test");
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/test").first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>

<style></style>
