<template>
  <section class="pt-25 flex flex-col gap-4" ref="scope">
    <h1 class="text-2xl font-medium text-foreground text-center">My Skills</h1>
    <ol class="grid grid-cols-12 gap-4 w-full bg-red-500">
      <li v-for="category in categories" :key="category.id" class="col-span-12">
        <div class="p-4">
          <h3 class="card-title text-2xl leading-10 mb-10 font-semibold">
            {{ category.name }}
          </h3>
          <ul class="flex items-center flex-wrap gap-8">
            <li
              v-for="skill in category.skills"
              :key="skill.name"
              class="rounded-full flex items-center gap-2"
            >
              <Icon v-if="skill.icon" :name="skill.icon" class="size-6" />
              <span>
                {{ skill.name }}
              </span>
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>

<script lang="ts" setup>
const {
  data: categories,
  status,
  error,
} = await useAsyncData("skills", () =>
  queryCollection("skill").order("name", "DESC").all(),
);

watch(categories, () => {
  console.log({ categories: categories.value });
});
</script>

<style></style>
