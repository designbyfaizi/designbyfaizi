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
            :key="piece.stem"
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
                  format="webp"
                  :src="piece.image"
                  :alt="`${piece.title}. ${piece.description}`"
                  width="640"
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
      <!-- A full-screen layer, so the buttons stay put however wide each picture makes the card.
           The spacing shares the leftover height equally above, between and below. -->
      <DialogContent
        :show-close-button="false"
        class="top-0 left-0 h-dvh w-full max-w-none translate-x-0 translate-y-0 flex flex-col items-center justify-evenly gap-0 rounded-none bg-transparent p-0 ring-0 sm:max-w-none"
        @click.self="isOpen = false"
      >
        <article
          v-if="selected"
          class="lightbox relative flex flex-col overflow-hidden border border-foreground bg-card max-sm:mt-auto max-sm:mb-6 sm:flex-row"
        >
          <!-- Stays on one element so the current picture holds until the next is ready. -->
          <img
            :src="lightboxImage(selected.image)"
            :alt="selected.title"
            width="640"
            height="640"
            class="lightbox-art block shrink-0 bg-ink object-contain transition-opacity duration-200 sm:bg-white sm:object-cover"
            :class="isLoading ? 'opacity-40 delay-150' : ''"
            @load="isLoading = false"
            @error="isLoading = false"
          />
          <div class="lightbox-text flex min-h-0 flex-initial flex-col p-5 sm:flex-1 lg:p-8">
            <div :key="selected.stem" class="flex min-h-0 flex-initial flex-col gap-3 overflow-x-hidden overflow-y-auto sm:flex-1">
              <p class="slug text-rose-ink">{{ selected.series }}</p>
              <DialogTitle class="display text-4xl sm:text-5xl lg:text-6xl">{{ selected.title }}</DialogTitle>
              <DialogDescription class="font-serif text-xl leading-snug text-foreground">
                {{ selected.description }}
              </DialogDescription>
              <OutLink v-if="selected.link" :to="selected.link" class="mt-1">View on Instagram</OutLink>
            </div>
          </div>
          <DialogClose as-child>
            <Button variant="ghost" size="icon-sm" class="absolute top-2 right-2 max-sm:bg-card">
              <Icon name="lucide:x" class="size-4" />
              <span class="sr-only">Close</span>
            </Button>
          </DialogClose>
        </article>
        <div class="flex gap-2 max-sm:mb-6">
          <Button variant="outline" size="sm" class="bg-card" @click="step(-1)">Previous</Button>
          <Button variant="outline" size="sm" class="bg-card" @click="step(1)">Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  </main>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { onKeyStroke } from "@vueuse/core";
import { snappy } from "@/lib/motion";

const site = useSite();
const img = useImage();
const accounts = ["khakcsar", "khak.csar"];

const { data: artworks } = await useArtworks();
const pieces = computed(() => artworks.value ?? []);

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

const lightboxImage = (image: string) => img(image, { width: 1600, format: "webp" });

const isLoading = ref(false);
watch(() => selected.value?.stem, () => {
  isLoading.value = true;
});

// Fetches the pictures on either side so stepping to them is instant.
watch([isOpen, selectedIndex], ([open, index]) => {
  if (!open) return;
  const total = visible.value.length;
  [-1, 1].forEach((change) => {
    new Image().src = lightboxImage(visible.value[(index + change + total) % total]!.image);
  });
});

onKeyStroke("ArrowRight", () => isOpen.value && step(1));
onKeyStroke("ArrowLeft", () => isOpen.value && step(-1));

usePageSeo("Art - Design By Faizi", site.value.art.intro);
</script>

<style scoped>
/* Phones: the card keeps its width and each picture sets its own height. Tall
   pictures stop at a height limit, with dark bars at the sides. */
.lightbox {
  /* The screen, less three 1.5rem gaps, the buttons and the card's border. */
  --frame: calc(100dvh - 6.5rem - 2px);
  box-sizing: content-box;
  width: 94vw;
  max-height: var(--frame);
}

.lightbox-art {
  width: 100%;
  height: auto;
  max-height: max(94vw, var(--frame) * 0.6);
}

/* Larger screens: the height is set per screen size and the picture decides the
   width, so there are never bars. A picture too wide for the screen is cropped. */
@media (min-width: 40rem) {
  .lightbox {
    --text: min(24rem, 40vw);
    --art: min(var(--frame), 94vw - var(--text));
    width: fit-content;
    max-height: none;
    height: var(--art);
  }

  .lightbox-art {
    width: auto;
    height: var(--art);
    max-width: calc(94vw - var(--text));
    max-height: none;
  }

  .lightbox-text {
    width: var(--text);
    min-width: var(--text);
  }
}
</style>
