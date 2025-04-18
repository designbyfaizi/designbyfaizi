<template>
  <div class="flex flex-col items-center">
    <div v-if="!blog" class="mx-auto"><Loader /></div>
    <div v-else-if="error && !blog">{{ error.message }}</div>
    <div v-else class="flex flex-col gap-4 w-full mx-auto content-grid">
      <div class="relative full-width breakout bg-card pt-4">
        <NuxtImg
          :src="blog?.featured_image"
          :alt="blog?.title"
          class="w-full !aspect-video rounded-xl bg-foreground/10 border-foreground/10 border object-cover"
          width="768"
        />
        <Button
          :as="(nuxtLink as string)"
          to="/blog"
          variant="soft"
          class="absolute top-8 left-4"
        >
          <Icon
            name="material-symbols:arrow-back-ios-new-rounded"
            class="size-[16px] -ms-1"
          />
          <span> Back </span>
        </Button>
        <GeneralHeroSection :title="blog?.title || ''">
          <div class="flex items-center gap-4 flex-wrap">
            <p
              class="px-3 py-1 bg-foreground/80 text-background w-fit rounded-full flex gap-2 items-center"
            >
              {{ (new Date(blog?.created_at!).toISOString().split("T")[0]) }}
            </p>
            <HoverCardRoot :open-delay="300" :update:open="refreshAuthor()">
              <HoverCardTrigger
                class="px-3 py-1 bg-primary/80 text-background w-fit rounded-full flex gap-2 items-center cursor-pointer hover:ring hover:ring-foreground/10"
              >
                <Icon name="solar:user-bold" class="size-[16px]" />
                <span>
                  {{ blog.author }}
                </span>
              </HoverCardTrigger>
              <HoverCardPortal>
                <HoverCardContent
                  class="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-xl bg-card/80 backdrop-blur-lg text-foreground p-5 data-[state=open]:transition-all border border-foreground/10 shadow-sm z-10"
                  :side-offset="5"
                >
                  <div v-if="!author?.name">
                    <Loader />
                  </div>
                  <div v-else class="flex flex-col">
                    <NuxtImg
                      :src="author?.avatar_url"
                      :alt="author?.name"
                      :width="64"
                      :height="64"
                      class="size-[64px] p-2 mb-4 rounded-full aspect-square object-cover ring ring-primary text-center flex items-center justify-center"
                    />
                    <h5 class="text-2xl font-bold">{{ author?.name }}</h5>
                    <p class="bio">{{ author?.bio }}</p>
                    <NuxtLink class="bg-card-foreground/80 hover:bg-card-foreground/60 text-card rounded-full w-fit px-2 py-1 text-xs mt-2" :to="`mailto:${author?.email}`">
                      {{ author?.email }}
                    </NuxtLink>
                  </div>
                  <HoverCardArrow
                    class="fill-card stroke-foreground/10 -mt-[0.4px]"
                    :width="12"
                    :height="6"
                  />
                </HoverCardContent>
              </HoverCardPortal>
            </HoverCardRoot>
          </div>
        </GeneralHeroSection>
      </div>
      <ContentRenderer
        :value="blog"
        :class="[
          'prose dark:prose-invert',
          'prose-img:rounded-2xl prose-figure:text-sm prose-figure:text-center',
          'prose-h1:font-semibold first:prose-h1:hidden',
          'prose-h2:font-bold',
          'prose-h3:font-medium',
          'prose-hr:border-red-500 dark:prose-hr:border-red-500',
          'prose-a:decoration-none',
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const nuxtLink = resolveComponent("NuxtLink");
const { params } = useRoute();

// @ts-ignore
const { data: blog, error, status } = await useAsyncData(
  () => {
    return queryCollection("blog").where("slug", "=", params.slug!).first();
  },
);

//Fetching author
const { data: author, refresh: refreshAuthor } = await useAsyncData(
  // @ts-ignore
  () => {
    return queryCollection("author").where("slug", "=", blog.value?.author).first();
  },
  {
    lazy: true,
    immediate: false,
  }
);

const config = useRuntimeConfig();
const title = blog.value?.title;
const description = "";

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  ogUrl: config.public.site_url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `https://r2.designbyfaizi.com/og_index.jpg`,
  twitterCard: "summary_large_image",
});
</script>

<style></style>
