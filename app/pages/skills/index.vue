<template>
  <main class="space-y-4 content-grid">
    <GeneralHeroSection title="Skills">
      <p class="">
        {{ description }}
      </p>
    </GeneralHeroSection>
    <section class="skills-section flex flex-col">
      <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !data">
        {{ "Uh-oh! Some Error occured.💀 Check server logs!" }}
      </div>
      <ol class="grid grid-cols-12 gap-4 w-full bg-red-500">
        <li
          v-for="category in categories"
          :key="category.id"
          class="col-span-12"
        >
          <div class="p-4">
            <h3 class="card-title text-2xl leading-10 mb-10 font-semibold">
              {{ category.name }}
            </h3>
            <ul class="flex items-center flex-wrap gap-8">
              <li
                v-for="skill in category.skills"
                :key="skill.name"
                class="rounded-full flex items-center gap-2"
              >
                <Icon v-if="skill.icon" :name="skill.icon" class="size-6" />
                <span>
                  {{ skill.name }}
                </span>
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </section>
  </main>
</template>

<script lang="ts" setup>
const {
  data: categories,
  status,
  error,
} = await useAsyncData("skills", () =>
  queryCollection("skill").order("name", "DESC").all(),
);

const config = useRuntimeConfig();
const title = "Skills - Design By Faizi";
const description =
  "A curated list of technologies, tools, and frameworks I use to build seamless digital experiences.";

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  ogUrl: config.public.site_url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  twitterCard: "summary_large_image",
});
</script>

<style></style>
