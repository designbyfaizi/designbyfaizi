<template>
  <section class="pt-[100px] space-y-4" ref="scope">
    <h1 class="text-4xl font-bold text-center">My Skills</h1>
    <SkillCategories :categories="categories?.docs" />
  </section>
</template>

<script lang="ts" setup>
const { data: categories, status, error } = await useFetch(
  "/api/payload/skill-categories"
);
</script>

<style></style>
