<template>
  <div class="flex flex-col items-center">
    <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
    <div v-else-if="error && !data">{{ error.message }}</div>
    <div v-else class="flex flex-col gap-4 w-full max-w-[65ch] mx-auto">
      <div class="relative">
        <NuxtImg
          :src="data?.blog.featured_image"
          :alt="data?.blog.name"
          class="w-full min-h-[320px] rounded-md bg-foreground/10 border-foreground/10 border object-cover"
          width="768"
        />
        <NuxtLink
          to="/knowledge-hub"
          class="bg-background/60 text-foreground hover:bg-background/40 backdrop-blur-lg p-1 px-3 rounded-sm flex items-center gap-2 absolute top-4 left-4"
        >
          <Icon
            name="material-symbols:arrow-back-ios-new-rounded"
            class="size-[16px] -ms-1"
          />
          <span> Back </span>
        </NuxtLink>
        <GeneralHeroSection
          class="!items-start !gap-2 !min-h-auto !h-auto !py-2 !px-2 absolute left-2 bottom-2 right-2 bg-opacity-80 backdrop-blur-md !rounded-sm"
        >
          <h1 class="font-bold text-2xl uppercase text-left">
            {{ data?.blog.name }}
          </h1>
          <p class="px-2 py-1 bg-foreground/5 w-fit rounded-sm text-foreground/60">
            {{ data?.blog.publish_date }}
          </p>
        </GeneralHeroSection>
      </div>
      <div
        v-html="data?.blogContent"
        :class="[
          'prose lg:prose-xl dark:prose-invert',
          'prose-img:rounded-2xl prose-figure:text-sm prose-figure:text-center',
          'prose-h1:font-semibold',
          'prose-h2:font-bold',
          'prose-h3:font-medium',
          'prose-hr:border-red-500 dark:prose-hr:border-red-500',
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute();
// data = { blog, blogContent };
const { data, status, error } = await useFetch(`/api/notion/blogs/${params.slug}`, {
  lazy: true,
});
</script>

<style></style>
