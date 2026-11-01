<template>
  <main>
    <PageHero :title="category!.name" label="The toolbox" :plate="4">
      <p class="font-serif text-2xl leading-snug">{{ category!.skills.length }} tools I reach for.</p>
      <Button :as="NuxtLink" to="/skills" variant="outline" size="sm" class="mt-5">
        <Icon name="lucide:arrow-left" class="size-4" />
        All skills
      </Button>
    </PageHero>
    <section class="sheet py-14 md:py-24">
      <ul class="grid grid-cols-3 border-t border-l sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        <li v-for="(tool, index) in category!.skills" :key="tool.name" v-reveal="index * 0.03">
          <SkillSwatch :tool="tool" />
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent("NuxtLink");
const route = useRoute();
const slug = route.params.slug as string;

const { data: category } = await useAsyncData(
  `skill-${slug}`,
  () => queryCollection("skill").where("stem", "=", `skills/${slug}`).first(),
  { getCachedData: fromPayload },
);

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: "Skill not found" });
}

usePageSeo(`${category.value.name} - Design By Faizi`, `The ${category.value.name} tools I work with.`);
</script>
