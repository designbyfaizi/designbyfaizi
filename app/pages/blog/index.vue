<template>
  <main class="space-y-4 content-grid">
    <GeneralHeroSection title="Blogs">
      <p>{{ description }}</p>
    </GeneralHeroSection>
    <section class="skills-section text-center flex flex-col">
      <div v-if="status === 'pending' && !blog" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !blog">{{ error.message }}</div>
      <ul v-else class="grid grid-cols-6 gap-4 items-stretch">
        <li
          v-for="_blog in blog"
          :key="_blog.slug"
          class="col-span-6 sm:col-span-3 w-full"
        >
          <NuxtLink
            :to="_blog.path"
            class="block w-full p-2 bg-card group rounded-md hover:bg-card/80 text-left h-full border border-transparent hover:border-foreground/10"
          >
            <div class="flex flex-col">
              <NuxtImg
                :src="_blog.featured_image"
                :alt="_blog.title"
                class="w-full object-cover aspect-video rounded-sm bg-background ring ring-2 ring-foreground/10"
                width="600px"
                loading="lazy"
              />
              <div class="p-2 md:p-3 md:px-1 flex flex-col gap-2">
                <p
                  class="px-3 py-1 bg-foreground/5 w-fit rounded-sm text-foreground/60 text-sm"
                >
                  {{ new Date(_blog.created_at)?.toISOString().split("T")[0] }}
                </p>
                <h3 class="font-normal text-lg group-hover:underline">
                  {{ _blog.title }}
                </h3>
              </div>
            </div>
          </NuxtLink>
        </li>
        <li
          class="border border-dashed bg-foreground/5 border-foreground/20 col-span-6 sm:col-span-3 p-4 rounded-md flex flex-col items-center justify-center text-center"
        >
          More coming 😃
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data: blog, error, status } = await useAsyncData("blog", () => {
  return queryCollection("blog").all();
});

const config = useRuntimeConfig();
const title = "Blogs - Design by Faizi";
const description = "Have a look at my writings.";

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
