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
      <div v-else class="flex flex-col gap-4">
        <NuxtLink
          v-for="client in data"
          :key="client.name"
          :to="client.url"
          target="_blank"
          :class="[
            'client flex flex-col items-start h-full bg-card hover:ring-2 hover:ring-foreground/20 transition-all duration-200 rounded-lg mb-1',
          ]"
        >
          <div class="img-container p-4 py-8 w-full">
            <img
              v-if="client.logo"
              :src="client.logo.src"
              :alt="client.logo.alt"
              class="max-h-[64px]"
            />
          </div>
          <div class="content p-4">
            <h2 class="text-2xl font-bold">{{ client.name }}</h2>
            <p class="text-base opacity-60 text-balance">
              {{ client.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data, status, error } = await useAsyncData("clients", () =>
  queryCollection("clients").order("name", "DESC").all()
);

console.log({ data: data.value });

const title = "Projects - Design By Faizi";
const description = "View my clients and projects.";

useSeoMeta({
  title,
  description,
});
</script>
