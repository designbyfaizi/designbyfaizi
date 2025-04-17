<template>
  <main class="space-y-4 content-grid">
    <GeneralHeroSection title="My Art">
      Some of my artwork. No AI involved. If I want to ghiblify myself, I do it myself 😤
    </GeneralHeroSection>
    <section
      class="grid grid-cols-12 gap-4 *:col-span-12 *:sm:col-span-6 *:lg:col-span-4"
    >
      <ArtModal v-for="art in arts" :key="art.name" :art>
        <ArtCard :art />
        <template #content> </template>
      </ArtModal>
    </section>
  </main>
</template>

<script lang="ts" setup>
const arts = [
  {
    name: "Elzariah Lunaveil",
    description:
      "Meet Elzariah, a character from my fantasy novel. While her story is still being written, I look forward to the day I can draw her for my web novel.",
    image_url: "/img/elzaria_lunaveil.png",
  },
];
</script>

<style></style>
