<template>
  <section class="sheet relative flex min-h-svh flex-col justify-between overflow-hidden pt-20 pb-6 md:pb-8">
    <CropMarks />

    <div class="slug grid grid-cols-2 gap-y-1 md:grid-cols-4">
      <span class="text-rose-ink">Sheet 01</span>
      <span class="text-right md:text-left">{{ site.name }}</span>
      <span>{{ site.location }}</span>
      <LocalClock :timezone="site.timezone" class="text-right" />
    </div>

    <h1 class="relative mt-6 md:mt-4">
      <span class="block font-serif text-3xl italic md:text-5xl">{{ site.hero.greeting }}</span>{{ " " }}
      <OverprintText :text="site.nickname" class="mega mt-2 block" :plate="14" :delay="0.15" />
    </h1>

    <motion.img
      data-enter
      :src="site.hero.avatar"
      :alt="site.hero.avatar_alt"
      width="150"
      height="100"
      draggable="false"
      class="absolute top-[22%] right-[6%] w-[22vw] max-w-56 cursor-grab touch-none drop-shadow-[6px_6px_0_var(--foreground)] active:cursor-grabbing md:top-[16%] md:w-[13vw]"
      drag
      drag-snap-to-origin
      :drag-elastic="0.5"
      :initial="{ opacity: 0, scale: 0.3, rotate: -40 }"
      :animate="{ opacity: 1, scale: 1, rotate: 8 }"
      :transition="{ type: 'spring', stiffness: 220, damping: 12, delay: 0.9 }"
      :while-hover="{ scale: 1.08, rotate: -6 }"
      :while-drag="{ scale: 1.2, rotate: 0 }"
    />

    <div class="mt-8 grid items-end gap-6 md:grid-cols-12">
      <RiseText
        :text="site.hero.statement"
        class="font-serif text-[1.75rem] leading-[1.15] md:col-span-6 md:text-4xl lg:text-5xl"
        :delay="0.6"
      />
      <motion.div
        v-if="site.hero.available"
        data-enter
        class="hidden justify-center md:col-span-2 md:flex"
        :initial="{ opacity: 0, scale: 0.6 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ ...gentle, delay: 1 }"
      >
        <SpinStamp :text="site.hero.availability_text" />
      </motion.div>
      <motion.div
        data-enter
        class="flex flex-col gap-4 md:col-span-4 md:items-end"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ ...gentle, delay: 0.85 }"
      >
        <Button :as="NuxtLink" to="/contact" variant="rose" size="lg">{{ site.hero.button_text }}</Button>
        <a :href="`mailto:${site.email}`" class="slug normal-case underline underline-offset-4 hover:text-rose-ink">
          {{ site.email }}
        </a>
      </motion.div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { gentle } from "@/lib/motion";

const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();
</script>
