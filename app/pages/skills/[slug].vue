<template>
  <div class="relative">
    <NuxtLink
      to="/skills"
      class="bg-foreground/80 text-background hover:bg-foreground p-1 px-3 rounded-full"
    >
      Back
    </NuxtLink>
    <div class="prose">
      <h1 class="">{{ data?.categoryTitle }}</h1>
    </div>
    <div v-if="status === 'pending' && !data">Loading...</div>
    <div v-else-if="error && !data">{{ error.message }}</div>
    <ul v-else class="flex flex-col gap-4">
      <li v-for="skill in data?.skills">
        {{ skill.name }}
        <div class="bg-foreground/20 w-full h-[1px]"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute();
console.log(params.slug)
const { data, status, error } = await useFetch(`/api/notion/skills/${params.slug}`, {
  lazy: true,
});
</script>

<style></style>
