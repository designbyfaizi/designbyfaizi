<template>
  <section class="sheet py-16 md:py-28">
    <SheetLabel number="09" :title="site.sections.journal" />
    <ul class="mt-10 md:mt-16">
      <li v-for="post in posts" :key="post.path" v-reveal class="border-t last:border-b">
        <NuxtLink :to="post.path" class="group grid items-baseline gap-2 py-6 md:grid-cols-12 md:gap-6 md:py-8">
          <span class="slug text-muted-foreground md:col-span-2">{{ shortDate(post.created_at) }}</span>
          <h3 class="display text-4xl transition-transform duration-300 group-hover:translate-x-3 group-hover:text-rose-ink md:col-span-6 md:text-6xl">
            {{ post.title }}
          </h3>
          <p class="font-serif text-xl leading-snug md:col-span-4">{{ post.description }}</p>
        </NuxtLink>
      </li>
    </ul>
    <div class="mt-8 flex justify-end">
      <Button :as="NuxtLink" to="/blog" variant="outline">Read the journal</Button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ posts: { path: string; title: string; description: string; created_at: string | Date }[] }>();

const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();
</script>
