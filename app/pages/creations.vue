<template>
  <main>
    <PageHero :title="site.creations.heading" label="Things I own">
      <RiseText :text="site.creations.intro" class="font-serif text-2xl leading-snug md:text-3xl" :delay="0.4" />
    </PageHero>
    <section class="sheet py-14 md:py-24">
      <ol class="flex flex-col gap-10">
        <li
          v-for="(creation, index) in creations"
          :key="creation.stem"
          v-reveal
          class="grid gap-8 border border-foreground bg-card p-5 md:grid-cols-12 md:p-10"
        >
          <div class="md:col-span-4">
            <motion.div
              class="flex aspect-square w-full items-center justify-center bg-foreground p-[18%]"
              :while-hover="{ rotate: -3, scale: 1.02 }"
              :transition="snappy"
            >
              <img :src="creation.image" :alt="`${creation.title} logo`" class="size-full object-contain" />
            </motion.div>
          </div>
          <div class="flex flex-col md:col-span-8">
            <p class="slug text-rose-ink">No. {{ String(index + 1).padStart(2, "0") }} / {{ creation.type }}</p>
            <h2 class="display mt-4 text-6xl md:text-8xl">{{ creation.title }}</h2>
            <p class="mt-5 max-w-2xl font-serif text-2xl leading-snug">{{ creation.description }}</p>
            <dl class="slug mt-8 grid border-t md:grid-cols-[8rem_1fr]">
              <dt class="pt-3 text-muted-foreground md:py-3">Built with</dt>
              <dd class="py-3"><TagList :tags="creation.tags" /></dd>
              <template v-if="creation.url">
                <dt class="border-t pt-3 text-muted-foreground md:py-3">Live</dt>
                <dd class="py-3 md:border-t">
                  <OutLink :to="creation.url">{{ creation.url.split("https://")[1] }}</OutLink>
                </dd>
              </template>
              <template v-if="creation.github_url">
                <dt class="border-t pt-3 text-muted-foreground md:py-3">Source</dt>
                <dd class="py-3 md:border-t"><OutLink :to="creation.github_url">Github</OutLink></dd>
              </template>
            </dl>
          </div>
        </li>
        <li v-reveal class="flex flex-col items-center gap-2 border border-dashed border-foreground/50 p-10 text-center md:p-16">
          <p class="display text-5xl md:text-7xl">More on press</p>
          <p class="font-serif text-xl italic">This sheet is still drying.</p>
        </li>
      </ol>
    </section>
  </main>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { snappy } from "@/lib/motion";

const site = useSite();

const { data: creations } = await useAsyncData(
  "creations",
  () => queryCollection("creation").order("date", "DESC").all(),
  { getCachedData: fromPayload },
);

usePageSeo("Creations - Design By Faizi", site.value.creations.intro);
</script>
