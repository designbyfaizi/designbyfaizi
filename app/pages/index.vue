<template>
  <main>
    <HomeHero />
    <InkMarquee :items="ticker" />
    <HomeIntro />

    <section id="work" class="sheet py-16 md:py-28">
      <CropMarks />
      <SheetLabel number="03" :title="site.sections.work" />
      <div class="mt-10 flex flex-col gap-20 md:mt-16 md:gap-32">
        <WorkSpread
          v-for="(project, index) in projects"
          :key="project.stem"
          :project="project"
          :index="index"
        />
      </div>
      <div class="mt-16 flex justify-end md:mt-24">
        <Button :as="NuxtLink" to="/projects" variant="outline">All projects</Button>
      </div>
    </section>

    <ProcessStack />

    <section class="sheet py-16 md:py-28">
      <SheetLabel number="05" :title="site.sections.skills" />
      <p class="mt-8 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">{{ site.skills.intro }}</p>
      <SkillCategories :categories="categories ?? []" class="mt-10 md:mt-14" />
    </section>

    <TerminalCard :categories="categories ?? []" :projects="projects ?? []" />
    <ClientWall :clients="clients ?? []" />
    <ArtStrip :artworks="(artworks ?? []).slice(0, 10)" />
    <JournalTeaser :posts="(posts ?? []).slice(0, 3)" />
    <ClosingCall />
  </main>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();

const { data: projects } = await useProjects();
const { data: clients } = await useClients();
const { data: categories } = await useSkills();
const { data: artworks } = await useArtworks();
const { data: posts } = await usePosts();

const ticker = computed(() => [
  ...site.value.marquee,
  ...(clients.value ?? []).map((client) => client.name),
]);

usePageSeo(site.value.title, site.value.description);
</script>
