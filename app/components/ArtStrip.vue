<template>
  <section class="overflow-hidden border-y bg-card py-16 md:py-28">
    <div class="sheet">
      <SheetLabel number="08" :title="site.sections.art" />
      <div class="mt-8 flex flex-col justify-between gap-6 md:mt-12 md:flex-row md:items-end">
        <p class="max-w-2xl font-serif text-3xl leading-tight md:text-5xl">{{ site.sections.art_note }}</p>
        <Button :as="NuxtLink" to="/art" variant="rose" class="self-start md:self-auto">Open the ink drawer</Button>
      </div>
    </div>
    <div ref="viewport" class="sheet mt-10 md:mt-14">
      <motion.ul
        ref="track"
        class="flex w-max cursor-grab touch-pan-y gap-3 active:cursor-grabbing md:gap-5"
        drag="x"
        :drag-constraints="{ left: -travel, right: 0 }"
        :drag-elastic="0.08"
        @drag-start="dragged = true"
        @drag-end="endDrag"
      >
        <li v-for="(art, index) in artworks" :key="art.stem" class="w-[62vw] shrink-0 sm:w-[38vw] md:w-[24vw]">
          <NuxtLink to="/art" draggable="false" class="group relative block" @click.capture="blockClickAfterDrag">
            <div class="relative aspect-square overflow-visible bg-white">
              <NuxtImg
                format="webp"
                :src="art.image"
                :alt="`${art.title}, ${art.description}`"
                width="640"
                loading="lazy"
                draggable="false"
                class="size-full object-cover transition-transform duration-500 group-hover:-rotate-1"
              />
              <GreasePencil v-if="art.picked" :delay="index * 0.05" />
            </div>
            <p class="slug mt-2 flex justify-between gap-3">
              <span class="text-rose-ink">{{ index + 1 }}A</span>
              <span class="truncate">{{ art.title }}</span>
            </p>
          </NuxtLink>
        </li>
      </motion.ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ArtCollectionItem } from "@nuxt/content";
import { motion } from "motion-v";
import { useElementSize, useWindowSize } from "@vueuse/core";

defineProps<{ artworks: ArtCollectionItem[] }>();

const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();

const track = useTemplateRef<{ $el: HTMLElement }>("track");
const trackEl = computed(() => track.value?.$el);
const { width: trackWidth } = useElementSize(trackEl);
const { width: windowWidth } = useWindowSize();
const travel = computed(() => Math.max(0, trackWidth.value - windowWidth.value + 96));

const dragged = ref(false);

const endDrag = () => {
  setTimeout(() => {
    dragged.value = false;
  }, 50);
};

const blockClickAfterDrag = (event: MouseEvent) => {
  if (dragged.value) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>
