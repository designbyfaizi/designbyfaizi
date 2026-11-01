<template>
  <section class="sheet pb-16 md:pb-28">
    <SheetLabel number="04" :title="site.process.title" />
    <ol class="mt-10 flex flex-col gap-6 md:mt-16">
      <li
        v-for="(step, index) in site.process.steps"
        :key="step.title"
        :class="['sticky grid min-h-[55vh] gap-6 border border-foreground p-6 md:grid-cols-12 md:p-10', plates[index % plates.length]]"
        :style="{ top: `calc(4.5rem + ${index * 1.25}rem)` }"
      >
        <p class="slug md:col-span-12">Plate {{ index + 1 }} of {{ site.process.steps.length }}</p>
        <p class="display self-end text-[32vw] leading-[0.7] md:col-span-4 md:text-[15vw]">{{ index + 1 }}</p>
        <div class="self-end md:col-span-7 md:col-start-6">
          <h3 class="display text-6xl md:text-8xl">{{ step.title }}</h3>
          <p class="mt-4 max-w-xl font-serif text-2xl leading-snug md:text-3xl">{{ step.text }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
const site = useSite();

const plates = [
  "bg-card text-foreground",
  "bg-primary text-ink",
  "bg-foreground text-background",
  "bg-rose-200 text-ink",
];
</script>
