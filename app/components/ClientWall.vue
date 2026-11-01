<template>
  <section class="sheet py-16 md:py-28">
    <SheetLabel number="07" :title="site.sections.clients" />
    <ul class="mt-10 grid grid-cols-2 border-t border-l md:mt-16 md:grid-cols-4">
      <li v-for="client in clients" :key="client.stem" v-reveal class="border-r border-b">
        <component
          :is="client.url ? 'a' : 'div'"
          :href="client.url"
          target="_blank"
          rel="noopener noreferrer"
          :title="client.name"
          class="group relative flex aspect-3/2 items-center justify-center overflow-hidden p-6 md:p-10"
        >
          <span class="absolute inset-0 origin-bottom-left scale-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-[1.5] group-hover:rotate-6" />
          <img
            :src="client.logo"
            :alt="client.name"
            loading="lazy"
            class="relative max-h-16 w-auto max-w-full transition-transform duration-300 group-hover:scale-110 dark:invert dark:group-hover:invert-0"
          />
        </component>
      </li>
      <li v-reveal class="border-r border-b">
        <NuxtLink
          to="/contact"
          class="group flex aspect-3/2 flex-col items-center justify-center gap-1 p-6 text-center hover:bg-foreground hover:text-background"
        >
          <span class="display text-3xl md:text-4xl">Your logo</span>
          <span class="slug text-rose-ink">Goes here</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { ClientCollectionItem } from "@nuxt/content";

defineProps<{ clients: ClientCollectionItem[] }>();

const site = useSite();
</script>
