<template>
  <section class="pt-[100px] flex flex-col gap-4" ref="scope">
    <h1 class="text-2xl font-medium text-foreground text-center">My Skills</h1>
    <SkillCategories :categories="data" />
  </section>
</template>

<script lang="ts" setup>
const { data, status, error } = await useAsyncData("skills", () =>
  queryCollection("skill").order("name", "DESC").all(),
);
</script>

<style></style>
