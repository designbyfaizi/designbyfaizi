<template>
  <section class="pt-[100px] aqler-container space-y-4" ref="scope">
    <h1 class="text-4xl font-bold text-center">My Clients</h1>
    <Motion
      as="div"
      initial="hidden"
      :animate="isInView ? 'visible' : 'hidden'"
      :transition="{
        type: 'spring',
        staggerChildren: 0.2,
      }"
      class="grid w-full grid-cols-12 gap-4 *:rounded-lg *:overflow-hidden *:col-span-4"
    >
      <Motion
        :variants="items"
        v-for="client in data?.docs"
        :key="client.id"
        class="bg-card/40 hover:bg-card"
        :while-hover="{
          translate: '0 -4px',
          backgroundColor: 'hsl(var(--card))'
        }"
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 10,
          duration: 0.1
        }"
      >
        <NuxtLink
          :to="client.url"
          target="_blank"
          :class="['client flex flex-col items-start p-8 h-full']"
        >
          <img
            v-if="client.logo"
            :src="client.logo"
            :alt="client.name"
            class="max-h-[72px]"
          />
          <h2 class="mt-10 text-2xl font-bold">{{ client.name }}</h2>
          <p class="text-base text-foreground/60">
            {{ client.description }}
          </p>
        </NuxtLink>
      </Motion>
      <Motion
        :while-hover="{
          scale: 1.01,
        }"
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }"
        :variants="items"
        class="border-2 border-dashed border-foreground/20 bg-card/20 hover:bg-card"
      >
        <NuxtLink to="/contact" :class="['flex flex-col p-8 h-full']">
          <Icon
            name="material-symbols:help-rounded"
            class="w-[72px] h-[72px] scale-120 text-foreground/40"
          />
          <h3 class="mt-10 text-2xl font-bold">You?</h3>
          <p class="text-foreground/60">It could be a start of something big</p>
        </NuxtLink>
      </Motion>
    </Motion>
  </section>
</template>

<script lang="ts" setup>
import type { easeOut, reverseEasing } from 'motion-v';

const { data } = await useFetch("/api/payload/clients");
const scope = ref(null);
const isInView = useInView(scope, {
  once: true,
});

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const items = {
  hidden: {
    y: 20,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
};
</script>

<style></style>
