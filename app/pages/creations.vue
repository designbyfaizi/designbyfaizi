<template>
  <main class="content-grid">
    <GeneralHeroSection title="Creations">
      <p>{{ description }}</p>
    </GeneralHeroSection>
    <section class="clients-section flex flex-col overflow-y-visible">
      <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !data">
        {{ "Uh-oh! Some Error occured.💀 Check server logs!" }}
      </div>
      <ol v-else class="grid grid-cols-6 *:col-span-6 lg:*:col-span-3 gap-4">
        <li
          v-for="project in data"
          :key="project.title"
          target="_blank"
          :class="[
            'project p-4 flex flex-col gap-4 items-start h-full border-1 border-foreground/10 bg-accent/30 dark:bg-card rounded-xl overflow-hidden mb-1',
          ]"
        >
          <div class="header flex items-center gap-4">
            <div
              class="img-container bg-stone-900 dark:bg-stone-800 p-2 w-fit rounded-lg"
            >
              <img
                v-if="project.image"
                :src="project.image"
                :alt="`${project.title} Logo`"
                class="max-h-[36px] rounded-lg"
              />
            </div>
          </div>
          <div class="content flex flex-col h-full">
            <div class="flex items-baseline gap-2">
              <h2 class="text-xl font-medium">{{ project.title }}</h2>
              <h3 class="type text-muted-foreground bg-muted px-3 py-1 rounded-full">{{ project.type }}</h3>
            </div>
            <p class="text-base opacity-60 text-balance mt-1">
              {{ project.description }}
            </p>
            <ul class="flex flex-row flex-wrap items-center gap-2 w-full mt-auto pt-4">
              <li
                class="px-3 py-1 bg-background/40 rounded-full ring-1 ring-foreground/10 text-muted-foreground text-xs font-semibold"
                v-for="tag in project.tags"
                :key="tag"
              >
                {{ tag }}
              </li>
            </ul>
            <div class="rounded-lg w-fit bg-stone-100 dark:bg-stone-800 overflow-hidden mt-4 divide-y divide-muted-foreground/10">
              <NuxtLink
                v-if="project.url"
                :to="project.url"
                target="blank"
                rel="noopener noreferrer"
                class="text-sm px-2 py-2 font-semibold text-muted-foreground hover:underline flex items-center flex-wrap gap-1 group"
              >
                <span>
                  {{ project.url.split("https://")[1] }}
                </span>
                <Icon
                  name="ic:outline-arrow-outward"
                  class="group-hover:translate-x-1 transition-transform duration-200"
                />
              </NuxtLink>
              <NuxtLink
                v-if="project.github_url"
                :to="project.github_url"
                target="blank"
                rel="noopener noreferrer"
                class="text-sm px-2 py-2 font-semibold text-muted-foreground hover:underline flex items-center flex-wrap gap-1 group"
              >
                <span>
                  {{ "Github" }}
                </span>
                <Icon
                  name="ic:outline-arrow-outward"
                  class="group-hover:translate-x-1 transition-transform duration-200"
                />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data, status, error } = await useAsyncData("creations", () =>
  queryCollection("creation").order("date", "DESC").all()
);

const title = "Creations - Design By Faizi";
const description =
  "View some of the projects I own. This list will get updated & you'll get to see some amazing stuff from me soon 🔥";

useSeoMeta({
  title,
  description,
});
</script>

<style></style>
