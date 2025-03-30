<template>
  <main class="space-y-4 content-grid">
    <GeneralHeroSection title="Skills">
      <p class="">
        A curated list of technologies, tools, and frameworks I use to build seamless
        digital experiences.
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
  queryCollection("skills").order("name", "DESC").all()
);

console.log({ data: data.value });

const title = "Skills | Design By Faizi";
</script>

<style></style>
