<template>
  <main class="content-grid">
    <GeneralHeroSection title="About Me"> </GeneralHeroSection>
    <section
      class="scroll-section py-[32px] text-base md:text-xl leading-tight font-medium flex flex-col lg:flex-row gap-10 items-center w-full"
    >
      <div
        class="img-container cursor-pointer min-h-[400px] w-full rounded-xl -rotate-3 hover:rotate-0 transition-all duration-200 overflow-hidden group"
      >
        <NuxtImg
          class="w-full h-[400px] aspect-square object-cover object-center basis-[100%] group-hover:scale-120 transition-all duration-200"
          :width="1024"
          src="/img/faizan_backview.jpeg"
        />
      </div>
      <div class="content flex flex-col gap-4 basis-[100%] bg-card p-4 rounded-xl border border-dashed border-3">
        <p class="w-full text-balance">
          I design, develop, and deploy apps on the internet. Looking for job opportunities in Germany. <br/>To learn more, send me a message.
        </p>
        <NuxtLink to="/contact">
          <Button>{{ "Say Hello" }}</Button>
        </NuxtLink>
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
