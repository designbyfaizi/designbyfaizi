<template>
  <main class="space-y-4">
    <GeneralHeroSection>
      <h1 class="max-w-screen-sm text-2xl">Knowledge Hub</h1>
      <p>Overflowing with knowledge—no stack required 😉</p>
    </GeneralHeroSection>
    <section class="skills-section text-center flex flex-col">
      <div v-if="status === 'pending' && !blogs" class="mx-auto"><Loader /></div>
      <div v-else-if="error && !blogs">{{ error.message }}</div>
      <ul v-else class="grid grid-cols-6 gap-4 items-stretch">
        <li
          v-for="blog in blogs"
          :key="blog.slug"
          class="col-span-6 sm:col-span-3 md:col-span-2 w-full"
        >
          <NuxtLink
            :to="`/knowledge-hub/${blog.slug}`"
            class="block w-full p-2 bg-card group rounded-md hover:bg-card/80 text-left h-full border border-transparent hover:border-foreground/10"
          >
            <div class="flex flex-col">
              <NuxtImg
                :src="blog.featured_image"
                :alt="blog.name"
                class="w-full object-cover aspect-video rounded-sm bg-background ring ring-2 ring-foreground/10"
                width="600px"
                loading="lazy"
              />
              <div class="p-2 md:p-3 md:px-1 flex flex-col gap-2">
                <p
                  class="px-3 py-1 bg-foreground/5 w-fit rounded-sm text-foreground/60 text-sm"
                >
                  {{ blog.publish_date }}
                </p>
                <h3 class="font-normal text-lg group-hover:underline">
                  {{ blog.name }}
                </h3>
              </div>
            </div>
          </NuxtLink>
        </li>
        <li
          class="border border-dashed bg-foreground/5 border-foreground/20 col-span-6 sm:col-span-3 md:col-span-2 rounded-md flex flex-col items-center justify-center text-center"
        >
          There is always room for more 😃
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
const { data: blogs, status, error } = await useFetch("/api/notion/blogs", {
  lazy: true,
});
</script>
