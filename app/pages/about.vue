<template>
  <main class="content-grid">
    <GeneralHeroSection title="About Me"> </GeneralHeroSection>
    <section
      class="scroll-section py-[32px] text-[22px] md:text-[28px] leading-tight font-medium flex flex-col lg:flex-row gap-10 items-center w-full"
    >
      <div
        class="img-container cursor-pointer min-h-[400px] w-full rounded-xl -rotate-3 hover:rotate-0 transition-all duration-200 overflow-hidden ring-foreground/5 hover:ring-foreground/20 ring-8 group"
      >
        <NuxtImg
          class="w-full h-[400px] aspect-square object-cover object-center basis-[100%] group-hover:scale-120 transition-all duration-200"
          :width="1024"
          src="/img/faizan_backview.jpeg"
        />
      </div>
      <div class="content flex flex-col gap-4 basis-[100%]">
        <p as="p" class="w-full pt-[50px]">
          I am a frontend <b>developer</b> and UI/UX <b>designer</b>, crafting
          <b>sleek</b> and <b>scalable</b> web experiences.
        </p>
        <p as="p" class="w-full">
          With expertise in modern frameworks and design tools, I build <b>fast</b>,
          <b>intuitive</b>, and <b>visually polished</b> interfaces.
        </p>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const title = "About - Design By Faizi";
const description =
  "I am a frontend <b>developer and UI/UX designer, crafting sleek and scalable web experiences.";

useSeoMeta({
  title,
  description,
});
</script>

<style></style>
