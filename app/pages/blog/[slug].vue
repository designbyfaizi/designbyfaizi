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
          <time class="text-rose-ink" :datetime="shortDate(post!.created_at)">{{ shortDate(post!.created_at) }}</time>
          <span v-if="updated">Updated <time :datetime="updated">{{ updated }}</time></span>
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
          <!-- The rail inks in rose as the reader moves through the post; the square marks where they are.
               It sits on the middle of the first line's letters (padding + half the line, less the
               part of the line Newsreader leaves empty above them), not the middle of the box. -->
          <!-- Long posts scroll inside the rail (shadcn-vue ScrollArea, so the scrollbar is a thin
               ink line instead of the browser's). The heading stays put; the left padding keeps the
               square from being cut off. -->
          <nav ref="tocNav" class="sticky top-24" aria-label="On this page">
            <p class="slug mb-3 text-rose-ink">On this page</p>
            <ScrollArea class="[&>[data-slot=scroll-area-viewport]]:max-h-[calc(100svh-10rem)]">
            <div class="flex flex-col pr-4 pl-1.5">
            <a
              v-for="(link, index) in toc"
              :key="link.id"
              :href="`#${link.id}`"
              :aria-current="index === current ? 'location' : undefined"
              :class="[
                'relative border-l-2 font-serif leading-snug hover:text-rose-ink motion-safe:transition-colors motion-safe:duration-300',
                link.depth > 2 ? 'py-1 pl-8 text-base' : 'py-1.5 pl-4 text-lg',
                index > current && 'border-border text-muted-foreground',
                index < current && 'border-primary',
                index === current && 'border-primary text-rose-ink',
              ]"
            >
              <motion.span
                v-if="index === current"
                layout-id="toc-marker"
                aria-hidden="true"
                :class="[
                  'absolute -left-[6px] size-2.5 bg-primary',
                  link.depth > 2 ? 'top-[calc(0.25rem+0.5625em-5px)]' : 'top-[calc(0.375rem+0.5625em-5px)]',
                ]"
                :transition="snappy"
              />
              {{ link.text }}
            </a>
            </div>
            </ScrollArea>
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
import { gentle, snappy } from "@/lib/motion";
import { ScrollArea } from "@/components/ui/scroll-area";

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
// Sections and their subsections (h2 and h3) in one flat list, in reading order.
type TocLink = { id: string; text: string; depth: number; children?: TocLink[] };
const toc = computed(() =>
  ((post.value?.body?.toc?.links ?? []) as TocLink[]).flatMap((link) => [link, ...(link.children ?? [])]),
);
const tocNav = useTemplateRef<HTMLElement>("tocNav");

const { scrollYProgress } = useScroll();
const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

// The section being read is the last heading above the top third of the screen.
// -1 means the reader hasn't reached the first heading yet.
const current = ref(-1);
let frame = 0;
const findCurrent = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const line = window.innerHeight / 3;
    current.value = toc.value.findLastIndex((link) => {
      const heading = document.getElementById(link.id);
      return heading ? heading.getBoundingClientRect().top <= line : false;
    });
  });
};
useEventListener("scroll", findCurrent, { passive: true });
useEventListener("resize", findCurrent, { passive: true });
onMounted(findCurrent);

// Keep the current entry inside the rail when the list is taller than the screen.
// Only the rail scrolls, never the page.
watch(current, (index) => {
  const view = tocNav.value?.querySelector<HTMLElement>("[data-slot=scroll-area-viewport]");
  const item = tocNav.value?.querySelectorAll("a")[index];
  if (!view || !item) return;
  const top = item.getBoundingClientRect().top - view.getBoundingClientRect().top + view.scrollTop;
  if (top < view.scrollTop + 40) view.scrollTop = top - 40;
  else if (top + item.offsetHeight > view.scrollTop + view.clientHeight - 40) view.scrollTop = top + item.offsetHeight - view.clientHeight + 40;
});

const created = shortDate(post.value.created_at);
const updated = post.value.updated_at && shortDate(post.value.updated_at) !== created ? shortDate(post.value.updated_at) : undefined;

// Link previews get the cover cut to the 1200×630 shape every platform expects, so the size
// below is always true whatever picture was uploaded. Posts without a cover use the site image.
const cover = post.value.featured_image
  ? useImage()(post.value.featured_image, { width: 1200, height: 630, fit: "cover", format: "jpg", quality: 85 })
  : undefined;
if (cover && import.meta.server) prerenderRoutes([cover]);

usePageSeo(`${post.value.title} - Design By Faizi`, post.value.description, cover);

const { public: { siteUrl } } = useRuntimeConfig();
useSeoMeta({
  ...(cover && {
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: "image/jpeg" as const,
    ogImageAlt: `Cover of “${post.value.title}”`,
    twitterImageAlt: `Cover of “${post.value.title}”`,
  }),
  ogType: "article",
  articlePublishedTime: created,
  articleModifiedTime: updated ?? created,
  articleAuthor: [site.value.name],
  articleTag: post.value.tags,
});
// Tells search engines this page is an article, by whom, and when it was written and revised.
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.value.title,
        description: post.value.description,
        image: post.value.featured_image ? `${siteUrl}${post.value.featured_image}` : undefined,
        datePublished: created,
        dateModified: updated ?? created,
        author: { "@type": "Person", name: site.value.name, url: siteUrl },
        mainEntityOfPage: `${siteUrl}${path}`,
        keywords: post.value.tags?.join(", "),
      }),
    },
  ],
});
</script>
