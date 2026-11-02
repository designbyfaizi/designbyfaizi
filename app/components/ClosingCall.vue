<template>
  <section class="sheet relative overflow-hidden bg-primary py-16 text-ink md:py-24">
    <CropMarks />
    <div class="slug flex items-baseline gap-3">
      <span>Sheet 10</span>
      <span class="h-px flex-1 bg-ink/40" />
      <span>{{ site.closing.title }}</span>
    </div>
    <!-- Nastaliq letters sit well below the centre of their line, so the Urdu is lifted back into the frame. -->
    <div class="relative mt-8 flex h-[34vw] min-h-40 items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          :key="greeting.text"
          :lang="greeting.lang"
          :dir="greeting.lang === 'ur' ? 'rtl' : 'ltr'"
          :class="greeting.lang === 'ur' ? 'relative bottom-[0.53em] w-full font-urdu text-[17vw] leading-[1.9]' : 'display text-[30vw]'"
          :initial="{ y: '100%', opacity: 0 }"
          :animate="{ y: '0%', opacity: 1 }"
          :exit="{ y: '-100%', opacity: 0 }"
          :transition="{ duration: 0.45, ease: press }"
        >
          {{ greeting.text }}
        </motion.p>
      </AnimatePresence>
    </div>
    <div class="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <p class="max-w-xl font-serif text-3xl leading-tight md:text-4xl">{{ site.closing.text }}</p>
      <Button :as="NuxtLink" to="/contact" variant="onRose" size="lg" class="self-start md:self-auto">
        {{ site.closing.button_text }}
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useIntervalFn } from "@vueuse/core";
import { press } from "@/lib/motion";

const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();

const greetings = [
  { text: "Hallo", lang: "de" },
  { text: "سلام", lang: "ur" },
  { text: "Hello", lang: "en" },
];

const index = ref(0);
const greeting = computed(() => greetings[index.value]!);

onMounted(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  useIntervalFn(() => {
    index.value = (index.value + 1) % greetings.length;
  }, 2600);
});
</script>
