<template>
  <main class="content-grid">
    <GeneralHeroSection title="Projects">
      <p>{{ description }}</p>
    </GeneralHeroSection>
    <section class="clients-section flex flex-col overflow-y-visible">
      <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !data">
        {{ "Uh-oh! Some Error occured.💀 Check server logs!" }}
      </div>
      <ol v-else class="flex flex-col gap-4">
        <li
          v-for="project in data"
          :key="project.title"
          target="_blank"
          :class="[
            'client flex flex-col items-start h-full border-1 border-foreground/10 bg-card hover:ring-2 hover:ring-foreground/20 transition-all duration-200 rounded-xl overflow-hidden mb-1',
          ]"
        >
          <div class="img-container bg-stone-800 p-4 py-8 w-full">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="`${project.title} Logo`"
              class="max-h-[64px]"
            />
          </div>
          <div class="content p-4">
            <h2 class="text-2xl font-bold">{{ project.title }}</h2>
            <p class="text-base opacity-60 text-balance">
              {{ project.description }}
            </p>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<script lang="ts" setup>
// const { data, status, error } = await useAsyncData("clients", () =>
//   queryCollection("client").order("name", "DESC").all()
// );

const { data, status, error } = await useAsyncData("projects", () =>
  queryCollection("project").order("date", "DESC").all()
);

console.log({ data: data.value });

const title = "Projects - Design By Faizi";
const description = "View some of my past projects. List will update in future!";

useSeoMeta({
  title,
  description,
});
</script>
