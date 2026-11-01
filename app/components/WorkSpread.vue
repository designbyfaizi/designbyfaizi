<template>
  <article ref="spread" class="grid items-center gap-6 md:grid-cols-12 md:gap-8">
    <a
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      :class="['group relative block md:col-span-7', flipped && 'md:order-2 md:col-start-6']"
      :aria-label="`Visit ${project.title}`"
    >
      <div class="absolute inset-0 translate-x-2 translate-y-2 bg-primary transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 md:translate-x-3 md:translate-y-3" />
      <div class="relative aspect-16/10 overflow-hidden border border-foreground">
        <motion.div class="absolute inset-x-0 -top-[8%] -bottom-[8%]" :style="{ y: drift }">
          <NuxtImg
            v-if="project.cover"
            format="webp"
            :src="project.cover"
            :alt="`${project.title} website`"
            width="1100"
            loading="lazy"
            class="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </div>
    </a>

    <div :class="['md:col-span-5', flipped && 'md:order-1 md:col-span-5 md:row-start-1']">
      <p v-reveal class="slug text-rose-ink">{{ String(index + 1).padStart(2, "0") }} / {{ project.type }}</p>
      <h2 v-reveal class="display mt-4 text-[9.5vw] [overflow-wrap:anywhere] md:text-[4.1vw]">{{ project.title }}</h2>
      <p v-reveal class="mt-5 font-serif text-xl leading-snug text-pretty md:text-2xl">{{ project.description }}</p>
      <TagList v-reveal :tags="project.tags" class="mt-6" />
      <OutLink v-reveal :to="project.url" class="mt-6">{{ project.url.split("https://")[1] }}</OutLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProjectCollectionItem } from "@nuxt/content";
import { motion, useScroll, useTransform } from "motion-v";

const props = defineProps<{ project: ProjectCollectionItem; index: number }>();

const flipped = computed(() => props.index % 2 === 1);

const spread = useTemplateRef("spread");
const { scrollYProgress } = useScroll({ target: spread, offset: ["start end", "end start"] });
const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
</script>
