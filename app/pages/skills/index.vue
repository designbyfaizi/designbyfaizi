<template>
  <main>
    <PageHero :title="site.skills.heading" label="The toolbox">
      <RiseText :text="site.skills.intro" class="font-serif text-2xl leading-snug md:text-3xl" :delay="0.4" />
    </PageHero>
    <div class="sheet flex flex-col gap-16 py-14 md:gap-24 md:py-24">
      <section v-for="(category, index) in categories" :key="category.stem">
        <SheetLabel :number="String(index + 2).padStart(2, '0')" :title="`${category.skills.length} tools`" as="span" />
        <NuxtLink :to="`/skills/${skillSlug(category.stem)}`" class="group mt-6 block">
          <h2 v-reveal class="display text-5xl transition-colors group-hover:text-rose-ink md:text-7xl">{{ category.name }}</h2>
        </NuxtLink>
        <ul class="mt-6 grid grid-cols-3 border-t border-l sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
          <li v-for="(tool, toolIndex) in category.skills" :key="tool.name" v-reveal="toolIndex * 0.03">
            <SkillSwatch :tool="tool" />
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
const site = useSite();
const { data: categories } = await useSkills();

usePageSeo("Skills - Design By Faizi", site.value.skills.intro);
</script>
