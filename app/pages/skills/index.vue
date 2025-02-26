<template>
  <main class="space-y-4">
    <section
      v-for="section in 1"
      :key="section"
      class="min-h-[200px] bg-neutral-200 dark:bg-neutral-800 rounded-lg p-4 flex flex-col items-center justify-center gap-4"
    >
      <h1 class="max-w-screen-sm text-2xl text-center">Skills</h1>
      <p class="text-center">
        A curated list of technologies, tools, and frameworks I use to build seamless
        digital experiences.
      </p>
    </section>
    <section class="skills-section">
      <div v-if="status === 'pending' && !categories">Loading...</div>
      <div v-else-if="error && !categories">{{ error.message }}</div>
      <ul v-else class="grid grid-cols-2 gap-4">
        <li v-for="category in categories" :key="category.slug" class="col-span-1 w-full">
          <NuxtLink
            :to="`/skills/${category.slug}`"
            class="block w-full p-4 bg-foreground/6 hover:underline"
          >
            {{ category.category }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data: categories, status, error } = await useFetch(
  "/api/notion/skill-categories",
  {
    lazy: true,
  }
);
</script>

<style></style>
