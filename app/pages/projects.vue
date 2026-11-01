<template>
  <main>
    <PageHero :title="site.projects.heading" label="Client work">
      <RiseText :text="site.projects.intro" class="font-serif text-2xl leading-snug md:text-3xl" :delay="0.4" />
    </PageHero>
    <section class="sheet py-14 md:py-24">
      <div class="flex flex-col gap-20 md:gap-32">
        <WorkSpread
          v-for="(project, index) in projects"
          :key="project.stem"
          :project="project"
          :index="index"
        />
      </div>
    </section>
    <ClientWall :clients="clients ?? []" />
    <ClosingCall />
  </main>
</template>

<script setup lang="ts">
const site = useSite();

const { data: projects } = await useProjects();
const { data: clients } = await useClients();

usePageSeo("Projects - Design By Faizi", site.value.projects.intro);
</script>
