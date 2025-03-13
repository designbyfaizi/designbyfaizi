<template>
  <div class="flex flex-col items-center">
    <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
    <div v-else-if="error && !data">{{ error.message }}</div>
    <div v-else class="flex flex-col gap-4 w-full">
      <GeneralHeroSection
        class="relative !flex-row !justify-start !min-h-auto !h-auto !py-6"
      >
        <NuxtLink
          to="/skills"
          class="bg-foreground/80 text-background hover:bg-foreground p-1 px-3 rounded-sm flex items-center gap-2"
        >
          <Icon
            name="material-symbols:arrow-back-ios-new-rounded"
            class="size-[16px] -ms-1"
          />
          <span> Back </span>
        </NuxtLink>
        <div class="font-bold text-4xl uppercase">
          <h1 class="">{{ data?.name }}</h1>
        </div>
      </GeneralHeroSection>
      <ul class="flex flex-col divide-y divide-border">
        <li v-for="skill in data?.skills" class="py-2">
          {{ skill?.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute();
console.log(params.slug);
const { data, status, error } = await useFetch(`/api/payload/skill-categories/${params.slug}`);
const title = `${data?.value?.name} | Design By Faizi`
</script>

<style></style>
