<template>
  <main>
    <HomeHero />
    <InkMarquee :items="site.marquee" />
    <LazyHomeIntro :hydrate-on-visible="ahead" />

    <section id="work" class="sheet py-16 md:py-28">
      <CropMarks />
      <SheetLabel number="03" :title="site.sections.work" />
      <div class="mt-10 flex flex-col gap-20 md:mt-16 md:gap-32">
        <LazyWorkSpread
          v-for="(project, index) in projects"
          :key="project.stem"
          :project="project"
          :index="index"
          :hydrate-on-visible="ahead"
        />
      </div>
      <div class="mt-16 flex justify-end md:mt-24">
        <Button :as="NuxtLink" to="/projects" variant="outline">All projects</Button>
      </div>
    </section>

    <LazyProcessStack :hydrate-on-visible="ahead" />

    <section class="sheet py-16 md:py-28">
      <SheetLabel number="05" :title="site.sections.skills" />
      <p class="mt-8 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">{{ site.skills.intro }}</p>
      <LazySkillCategories :hydrate-on-visible="ahead" :categories="categories ?? []" class="mt-10 md:mt-14" />
    </section>

    <LazyTerminalCard :hydrate-on-visible="ahead" :categories="categories ?? []" :projects="projects ?? []" />
    <LazyClientWall :hydrate-on-visible="ahead" :clients="clients ?? []" />
    <LazyArtStrip :hydrate-on-visible="ahead" :artworks="(artworks ?? []).slice(0, 10)" />
    <LazyJournalTeaser :hydrate-on-visible="ahead" :posts="(posts ?? []).slice(0, 3)" />
    <LazyClosingCall :hydrate-on-visible="ahead" />
  </main>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent("NuxtLink");

// Below the hero, each section only hydrates as it nears the screen, so the page
// isn't all brought to life in one long task on load. The head start lets
// scroll-in animations set up before the section is seen.
const ahead = { rootMargin: "300px 0px" };
const site = useSite();

const { data: projects } = await useProjects();
const { data: clients } = await useClients();
const { data: categories } = await useSkills();
const { data: artworks } = await useArtworks();
const { data: posts } = await usePosts();

usePageSeo(site.value.title, site.value.description);
</script>
