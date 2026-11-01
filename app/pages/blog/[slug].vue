<template>
  <main>
    <ClientOnly>
      <motion.div
        aria-hidden="true"
        class="fixed inset-x-0 top-14 z-40 h-1 origin-left bg-primary"
        :style="{ scaleX: progress }"
      />
    </ClientOnly>

    <article>
      <header class="sheet overflow-hidden pt-24 pb-10 md:pt-28">
        <CropMarks />
        <div class="slug flex flex-wrap items-center gap-x-5 gap-y-1">
          <NuxtLink to="/blog" class="hover:text-rose-ink">
            <Icon name="lucide:arrow-left" class="mr-1 inline size-3.5" />Journal
          </NuxtLink>
          <span class="text-rose-ink">{{ shortDate(post!.created_at) }}</span>
          <span>{{ site.name }}</span>
          <span>{{ minutes }} min read</span>
        </div>
        <RiseText :text="post!.title" as="h1" class="display mt-8 max-w-[16ch] text-[15vw] md:text-[9vw]" />
        <p class="mt-6 max-w-2xl font-serif text-2xl leading-snug md:text-3xl">{{ post!.description }}</p>
      </header>

      <div class="sheet">
        <motion.div
          data-enter
          class="overflow-hidden border border-foreground [container-type:inline-size]"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ ...gentle, delay: 0.3 }"
        >
          <BlogCover :src="post!.featured_image" :title="post!.title" />
        </motion.div>
      </div>

      <div class="sheet mt-12 grid gap-10 pb-16 md:mt-16 md:grid-cols-12">
        <aside v-if="toc.length" class="hidden md:col-span-3 md:block">
          <nav class="sticky top-24 flex flex-col gap-2" aria-label="On this page">
            <p class="slug text-rose-ink">On this page</p>
            <a
              v-for="link in toc"
              :key="link.id"
              :href="`#${link.id}`"
              class="font-serif text-lg leading-snug hover:text-rose-ink"
            >
              {{ link.text }}
            </a>
          </nav>
        </aside>
        <ContentRenderer
          :value="post!"
          :class="['prose min-w-0 max-w-none dark:prose-invert md:col-span-8', toc.length ? 'md:col-start-5' : 'md:col-start-3']"
        />
      </div>

      <nav class="sheet grid border-t md:grid-cols-2" aria-label="More posts">
        <component
          :is="neighbour ? NuxtLink : 'div'"
          v-for="(neighbour, index) in surroundings ?? []"
          :key="index"
          :to="neighbour?.path"
          :class="['group py-8 md:py-12', index === 1 && 'text-right md:border-l md:pl-8', index === 0 && 'md:pr-8']"
        >
          <template v-if="neighbour">
            <p class="slug text-muted-foreground">{{ index === 0 ? "Previous" : "Next" }}</p>
            <p class="display mt-2 text-4xl group-hover:text-rose-ink md:text-5xl">{{ neighbour.title }}</p>
          </template>
        </component>
      </nav>
    </article>
  </main>
</template>

<script setup lang="ts">
import { motion, useScroll, useSpring } from "motion-v";
import { gentle } from "@/lib/motion";

const NuxtLink = resolveComponent("NuxtLink");
const route = useRoute();
const site = useSite();
const slug = route.params.slug as string;
const path = `/blog/${slug}`;

const { data: post } = await useAsyncData(
  `post-${slug}`,
  () => queryCollection("blog").path(path).where("published", "=", true).first(),
  { getCachedData: fromPayload },
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

const { data: surroundings } = await useAsyncData(
  `post-${slug}-neighbours`,
  () =>
    queryCollectionItemSurroundings("blog", path, { fields: ["title"] })
      .where("published", "=", true)
      .order("created_at", "DESC")
      .order("title", "ASC"),
  { getCachedData: fromPayload },
);

const minutes = readingMinutes(post.value.rawbody);
const toc = computed(() => post.value?.body?.toc?.links ?? []);

const { scrollYProgress } = useScroll();
const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

usePageSeo(`${post.value.title} - Design By Faizi`, post.value.description);
</script>
