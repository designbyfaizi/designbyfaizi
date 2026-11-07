<template>
  <main>
    <PageHero :title="site.blog.heading" label="Writing">
      <RiseText :text="site.blog.intro" class="font-serif text-2xl leading-snug md:text-3xl" :delay="0.4" />
    </PageHero>
    <section class="sheet py-12 md:py-20">
      <div v-if="tags.length > 1" class="mb-10 flex flex-wrap gap-1">
        <button
          v-for="tag in ['All', ...tags]"
          :key="tag"
          :class="['slug relative px-3 py-2', activeTag === tag && 'text-ink']"
          @click="activeTag = tag"
        >
          <motion.span
            v-if="activeTag === tag"
            layout-id="blog-tag"
            class="absolute inset-0 bg-primary"
            :transition="snappy"
          />
          <span class="relative">{{ tag }}</span>
        </button>
      </div>

      <AnimatePresence mode="popLayout" :initial="false">
        <motion.article
          v-if="lead"
          :key="lead.path"
          layout
          class="border-t border-foreground pt-6"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
        >
          <NuxtLink :to="lead.path" class="group grid gap-6 md:grid-cols-12 md:gap-8">
            <div class="self-start overflow-hidden border border-foreground [container-type:inline-size] md:col-span-7">
              <BlogCover :src="lead.featured_image" :title="lead.title" class="transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div class="flex flex-col md:col-span-5">
              <p class="slug text-rose-ink">{{ shortDate(lead.created_at) }} / {{ lead.minutes }} min read</p>
              <h2 class="display mt-4 text-6xl group-hover:text-rose-ink md:text-7xl lg:text-8xl">{{ lead.title }}</h2>
              <p class="mt-4 font-serif text-2xl leading-snug">{{ lead.description }}</p>
            </div>
          </NuxtLink>
        </motion.article>
      </AnimatePresence>

      <ul class="mt-12 grid gap-x-8 border-t md:grid-cols-3">
        <AnimatePresence mode="popLayout" :initial="false">
          <motion.li
            v-for="post in rest"
            :key="post.path"
            layout
            class="border-b py-6 md:border-r md:border-b-0 md:pr-8 md:last:border-r-0"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
          >
            <NuxtLink :to="post.path" class="group block">
              <div class="overflow-hidden border border-foreground [container-type:inline-size]">
                <BlogCover :src="post.featured_image" :title="post.title" class="transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p class="slug mt-4 text-rose-ink">{{ shortDate(post.created_at) }} / {{ post.minutes }} min read</p>
              <h3 class="display mt-2 text-4xl group-hover:text-rose-ink">{{ post.title }}</h3>
              <p class="mt-2 font-serif text-lg leading-snug">{{ post.description }}</p>
            </NuxtLink>
          </motion.li>
        </AnimatePresence>
        <li class="flex flex-col justify-center py-6">
          <p class="display text-4xl text-muted-foreground">More coming 😃</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { snappy } from "@/lib/motion";

const site = useSite();
const { data: posts } = await usePosts();

const activeTag = ref("All");
const tags = computed(() => [...new Set(posts.value?.flatMap((post) => post.tags ?? []))]);
const visible = computed(() =>
  activeTag.value === "All"
    ? (posts.value ?? [])
    : (posts.value ?? []).filter((post) => post.tags?.includes(activeTag.value)),
);

// The first post runs as the lead story, like the top of a front page.
const lead = computed(() => visible.value.find((post) => post.featured_image) ?? visible.value[0]);
const rest = computed(() => visible.value.filter((post) => post !== lead.value));

usePageSeo("Journal - Design By Faizi", site.value.blog.intro);
</script>
