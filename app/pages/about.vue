<template>
  <main class="content-grid">
    <PageHero :title="site.about.heading" />
    <section class="flex w-full flex-col items-center gap-10 py-8 text-base/tight font-medium md:text-xl/7 lg:flex-row">
      <motion.div
        data-enter
        class="group min-h-[400px] w-full cursor-pointer overflow-hidden rounded-xl"
        :initial="{ opacity: 0, rotate: -9, scale: 0.94 }"
        :animate="{ opacity: 1, rotate: -3, scale: 1 }"
        :while-hover="{ rotate: 0, scale: 1.01 }"
        :transition="gentle"
      >
        <NuxtImg
          format="webp"
          :src="site.about.photo"
          :alt="site.about.photo_alt"
          width="1024"
          class="aspect-square h-[400px] w-full basis-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </motion.div>
      <motion.div
        data-enter
        class="flex basis-full flex-col gap-4 rounded-xl border-3 border-dashed border-current bg-card p-4"
        :initial="{ opacity: 0, x: 24 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ ...gentle, delay: 0.12 }"
      >
        <p class="w-full text-balance whitespace-pre-line">{{ site.about.text }}</p>
        <div>
          <Button :as="NuxtLink" to="/contact">{{ site.about.button_text }}</Button>
        </div>
      </motion.div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { gentle } from "@/lib/motion";

const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();

usePageSeo("About - Design By Faizi", site.value.about.description);
</script>
