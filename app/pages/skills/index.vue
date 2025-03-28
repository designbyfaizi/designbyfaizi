<template>
  <main class="space-y-4">
    <GeneralHeroSection>
      <h1 class="max-w-screen-sm text-2xl text-center">Skills</h1>
      <p class="">
        A curated list of technologies, tools, and frameworks I use to build seamless
        digital experiences.
      </p>
    </GeneralHeroSection>
    <section class="skills-section flex flex-col">
      <div v-if="status === 'pending' && !categories" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !categories">
        {{ "Uh-oh! Some Error occured.💀 Check server logs!" }}
      </div>
      <SkillCategories v-else :categories="categories?.docs" />
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data: categories, status, error } = await useFetch(
  "/api/payload/skill-categories",
  {
    lazy: true,
  }
);
const title = "Skills | Design By Faizi";
</script>

<style></style>
