<template>
  <div class="flex flex-col items-center">
    <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
    <div v-else-if="error && !data">{{ error.message }}</div>
    <div v-else class="flex flex-col gap-4 w-full mx-auto content-grid">
      <div class="relative full-width breakout bg-card pt-4">
        <NuxtImg
          :src="data?.blog.featured_image"
          :alt="data?.blog.name"
          class="w-full min-h-[320px] rounded-xl bg-foreground/10 border-foreground/10 border object-cover"
          width="768"
        />
        <Button
          :as="(nuxtLink as string)"
          to="/knowledge-hub"
          variant="soft"
          class="absolute top-8 left-4"
        >
          <Icon
            name="material-symbols:arrow-back-ios-new-rounded"
            class="size-[16px] -ms-1"
          />
          <span> Back </span>
        </Button>
        <GeneralHeroSection
          :title="data?.blog.name || ''"
        >
        <div class="flex items-center gap-4 flex-wrap">
          <p class="px-3 py-1 bg-foreground/80 text-background w-fit rounded-full flex gap-2 items-center">
            {{ data?.blog.publish_date }}
          </p>
          <p class="px-3 py-1 bg-primary/80 text-background w-fit rounded-full flex gap-2 items-center">
          <Icon name="solar:user-bold" class="size-[16px]" />
          <span>
            {{ "Faizi" }}
          </span>
          </p>
        </div>
        </GeneralHeroSection>
      </div>
      <div
        v-html="data?.blogContent"
        :class="[
          'prose dark:prose-invert',
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
const nuxtLink = resolveComponent("NuxtLink");
const { params } = useRoute();
// data = { blog, blogContent };
const { data, status, error } = await useFetch(`/api/notion/blogs/${params.slug}`, {
  lazy: true,
});
</script>

<style></style>
