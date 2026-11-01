<template>
  <section class="sheet overflow-hidden border-b pt-24 pb-10 md:pt-28 md:pb-14">
    <CropMarks />
    <SheetLabel number="01" :title="label" as="span" />
    <h1 class="mt-8 md:mt-12">
      <OverprintText :text="title" class="display text-[23vw] md:text-[17vw]" :plate="plate" />
    </h1>
    <div class="mt-6 grid gap-6 md:mt-10 md:grid-cols-12">
      <div class="md:col-span-5 md:col-start-8">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; label: string; plate?: number }>(), { plate: 6 });
</script>
