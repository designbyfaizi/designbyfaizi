<template>
  <section class="pt-[100px] space-y-4" ref="scope">
    <h1 class="text-4xl font-bold text-center">My Skills</h1>
    <SkillCategories :categories="data" />
  </section>
</template>

<script lang="ts" setup>
const { data, status, error } = await useAsyncData("skills", () =>
  queryCollection("skills").order("name", "DESC").all()
);
</script>

<style></style>
