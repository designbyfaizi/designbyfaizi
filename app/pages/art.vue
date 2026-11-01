<template>
  <main>
    <PageHero :title="site.art.heading" label="Contact sheet" :plate="10">
      <RiseText :text="site.art.intro" class="font-serif text-2xl leading-snug md:text-3xl" :delay="0.4" />
      <div class="mt-5 flex flex-wrap gap-3">
        <Button
          v-for="account in accounts"
          :key="account"
          as="a"
          :href="`https://www.instagram.com/${account}/`"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
          class="normal-case"
        >
          @{{ account }}
        </Button>
      </div>
    </PageHero>

    <section class="sheet py-12 md:py-20">
      <Tabs v-model="activeSeries">
        <TabsList class="h-auto w-full flex-wrap justify-start gap-1 rounded-none bg-transparent p-0">
          <TabsTrigger
            v-for="series in seriesList"
            :key="series"
            :value="series"
            class="slug relative h-auto flex-none rounded-none border-0 px-3 py-2 data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent"
            :class="activeSeries === series ? 'dark:!text-ink' : ''"
          >
            <motion.span
              v-if="activeSeries === series"
              layout-id="art-tab"
              class="absolute inset-0 bg-primary"
              :transition="snappy"
            />
            <span class="relative">{{ series }}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <motion.ul layout class="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" :initial="false">
          <motion.li
            v-for="(piece, index) in visible"
            :key="piece.id"
            layout
            data-enter
            :initial="{ opacity: 0, y: 24 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, scale: 0.95 }"
            :transition="snappy"
          >
            <button type="button" class="group block w-full text-left" @click="open(index)">
              <div class="relative aspect-square bg-white">
                <span class="absolute inset-0 bg-primary transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
                <NuxtImg
                  v-if="piece.local"
                  format="webp"
                  :src="piece.image"
                  :alt="`${piece.title}. ${piece.description}`"
                  width="640"
                  loading="lazy"
                  class="relative size-full object-cover"
                />
                <img
                  v-else
                  :src="piece.image"
                  :alt="piece.title"
                  loading="lazy"
                  class="relative size-full object-cover"
                />
                <GreasePencil v-if="piece.picked" :delay="index * 0.03" />
              </div>
              <p class="slug mt-2 flex justify-between gap-3">
                <span class="text-rose-ink">{{ index + 1 }}A</span>
                <span class="truncate">{{ piece.title }}</span>
              </p>
            </button>
          </motion.li>
        </AnimatePresence>
      </motion.ul>
    </section>

    <Dialog v-model:open="isOpen">
      <DialogContent class="w-[94vw] max-w-5xl gap-0 rounded-none border border-foreground bg-card p-0 ring-0 sm:max-w-5xl">
        <motion.article
          v-if="selected"
          :key="selected.id"
          class="grid max-h-[88dvh] overflow-y-auto md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
          :initial="{ opacity: 0, scale: 0.98 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="snappy"
        >
          <div class="bg-white">
            <img :src="selected.fullImage" :alt="selected.title" class="mx-auto max-h-[70dvh] object-contain md:max-h-[88dvh]" />
          </div>
          <div class="flex flex-col gap-3 p-5 md:p-8">
            <p class="slug text-rose-ink">{{ selected.series }}</p>
            <DialogTitle class="display text-5xl md:text-6xl">{{ selected.title }}</DialogTitle>
            <DialogDescription class="font-serif text-xl leading-snug text-foreground">
              {{ selected.description }}
            </DialogDescription>
            <OutLink v-if="selected.link" :to="selected.link" class="mt-1">View on Instagram</OutLink>
            <div class="mt-auto flex gap-2 pt-6">
              <Button variant="outline" size="sm" @click="step(-1)">Previous</Button>
              <Button variant="outline" size="sm" @click="step(1)">Next</Button>
            </div>
          </div>
        </motion.article>
      </DialogContent>
    </Dialog>
  </main>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { onKeyStroke } from "@vueuse/core";
import { snappy } from "@/lib/motion";

type Piece = {
  id: string;
  title: string;
  series: string;
  description: string;
  image: string;
  fullImage: string;
  link?: string;
  picked: boolean;
  local: boolean;
};

const site = useSite();
const img = useImage();
const accounts = ["khakcsar", "khak.csar"];

const { data: artworks } = await useArtworks();

const saved = computed<Piece[]>(() =>
  (artworks.value ?? []).map((art) => ({
    id: art.stem,
    title: art.title,
    series: art.series,
    description: art.description,
    image: art.image,
    fullImage: img(art.image, { width: 640, format: "webp" }),
    link: art.link ?? undefined,
    picked: art.picked,
    local: true,
  })),
);

// New posts arrive from Instagram after the page loads. Anything already saved
// on the site keeps its title, and the saved gallery shows if the feed is off.
const live = ref<Piece[]>([]);

const postId = (link?: string) => link?.match(/\/(?:p|reel)\/([\w-]+)/)?.[1];

onMounted(async () => {
  try {
    const posts = await $fetch<
      { id: string; account: string; caption: string; link: string; image: string; date: string }[]
    >("/api/instagram");
    const known = new Set(saved.value.map((piece) => postId(piece.link)));
    live.value = posts
      .filter((post) => !known.has(postId(post.link)))
      .map((post) => {
        const firstLine = post.caption.split("\n")[0]?.trim() ?? "";
        return {
          id: post.id,
          title: firstLine.slice(0, 40) || `@${post.account}`,
          series: "New on Instagram",
          description: post.caption,
          image: post.image,
          fullImage: post.image,
          link: post.link,
          picked: false,
          local: false,
        };
      });
  } catch {
    live.value = [];
  }
});

const pieces = computed(() => [...live.value, ...saved.value]);

const activeSeries = ref("Everything");
const seriesList = computed(() => [
  "Everything",
  ...new Set(pieces.value.map((piece) => piece.series)),
]);
const visible = computed(() =>
  activeSeries.value === "Everything"
    ? pieces.value
    : pieces.value.filter((piece) => piece.series === activeSeries.value),
);

const isOpen = ref(false);
const selectedIndex = ref(0);
const selected = computed(() => visible.value[selectedIndex.value]);

const open = (index: number) => {
  selectedIndex.value = index;
  isOpen.value = true;
};

const step = (change: number) => {
  const total = visible.value.length;
  selectedIndex.value = (selectedIndex.value + change + total) % total;
};

onKeyStroke("ArrowRight", () => isOpen.value && step(1));
onKeyStroke("ArrowLeft", () => isOpen.value && step(-1));

usePageSeo("Art - Design By Faizi", site.value.art.intro);
</script>
