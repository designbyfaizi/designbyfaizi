<template>
  <main class="content-grid flex-1 flex flex-col">
    <section
      class="flex flex-col items-center gap-4 justify-center rounded-xl py-20"
    >
      <nuxt-img
        src="/images/rustacean-flat-gesture.svg"
        alt="Rustacean Logo"
        class="w-[80px] h-[80px] rounded-full bg-stone-200 dark:bg-stone-800 !aspect-square object-contain p-2"
        :width="400"
        :height="400"
      />
      <h1 class="text-4xl font-bold">Hi, I'm Faizi</h1>
      <p class="text-lg">I design and develop stuff for the web.</p>
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <nuxt-link :to="`mailto:faizanullah1999@gmail.com`">
          <Button variant="soft" class="gap-4" :animate="false">
            <p>
              {{ "faizanullah1999@gmail.com" }}
            </p>
          </Button>
        </nuxt-link>
        <nuxt-link to="/contact">
          <Button>{{ "Hallo" }}</Button>
        </nuxt-link>
      </div>
      <!-- Availability Text -->
      <nuxt-link
        to="/contact"
        class="flex gap-2 items-center text-green-500 hover:bg-green-500/10 px-3 py-2 rounded-xl cursor-pointer focus:ring-1 ring-green-500/60 outline-none"
      >
        <div class="dot size-[10px] rounded-full bg-green-500 relative">
          <div
            class="absolute inset-0 bg-green-500 animate-ping rounded-full"
          ></div>
        </div>
        <p class="font-300 text-sm">{{ "Available for new projects" }}</p>
      </nuxt-link>
    </section>
    <section class="flex flex-col items-center gap-4">
      <h1 class="text-2xl font-medium text-foreground">My Clients</h1>
      <ol class="grid grid-cols-12 gap-4 *:h-20">
        <li
          v-for="brand in brands"
          :key="brand.name"
          class="col-span-12 sm:col-span-6 md:col-span-3 bg-stone-100 dark:bg-stone-900 p-4 rounded-2xl flex flex-row justify-center items-center"
        >
          <brand-logo
            :name="brand.name"
            :alt="brand.alt"
            class="h-10 text-foreground"
          />
        </li>
        <nuxt-link
          to="/contact"
          class="col-span-12 sm:col-span-6 md:col-span-3 bg-stone-100/70 dark:bg-stone-900/60 p-4 rounded-2xl flex flex-row justify-center items-center"
          :class="[
            'outline outline-dashed outline-muted-foreground/30 group hover:outline-primary cursor-pointer',
          ]"
        >
          <p
            class="text-7xl font-thin text-muted-foreground/30 group-hover:text-primary"
          >
            +
          </p>
        </nuxt-link>
      </ol>
    </section>
    <HomeSkillsSection />
    <!-- <HomeDescriptionSection />
    <HomeSkillsSection /> -->
  </main>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/").first(),
);

const brands = [
  {
    name: "bullet" as const,
    alt: "Bullet Flughafentransfer",
  },
  {
    name: "mano" as const,
    alt: "Mano Animation Studios",
  },
  {
    name: "imrooz" as const,
    alt: "Imrooz",
  },
];

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
  ogTitle: data.value?.title,
  ogDescription: data.value?.description,
  ogImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  ogUrl: config.public.site_url,
  twitterTitle: data.value?.title,
  twitterDescription: data.value?.description,
  twitterImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  twitterCard: "summary_large_image",
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
