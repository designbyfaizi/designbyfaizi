<template>
  <main class="space-y-4">
    <GeneralHeroSection>
      <h1 class="max-w-screen-sm text-2xl text-center">Skills</h1>
      <p class="">
        A curated list of technologies, tools, and frameworks I use to build seamless
        digital experiences.
      </p>
    </GeneralHeroSection>
    <section class="skills-section text-center flex flex-col">
      <div v-if="status === 'pending' && !categories" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !categories">{{ "Uh-oh! Some Error occured.💀 Check server logs!" }}</div>
      <ul v-else class="grid grid-cols-2 gap-4">
        <li v-for="category in categories?.docs" :key="category.id" class="col-span-2 w-full">
          <NuxtLink
            :to="`/skills`"
            class="block w-full p-4 bg-card hover:underline rounded-md hover:bg-card/80 text-left text-xl font-semibold"
          >
            {{ category.name }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data: categories, status, error } = await useFetch("/api/payload/skill-categories", {
  lazy: true,
});

</script>

<style></style>
