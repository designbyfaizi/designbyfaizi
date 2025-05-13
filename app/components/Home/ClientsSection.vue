<template>
  <section class="pt-[100px] space-y-4" ref="scope">
    <h1 class="text-4xl font-bold text-center">My Clients</h1>
    <div class="grid grid-cols-6 gap-4 w-full">
      <NuxtLink
        v-for="client in data"
        :key="client.id"
        :to="client.url"
        target="_blank"
        rel="noopener noreferrer"
        class="col-span-6 sm:col-span-3 lg:col-span-2 flex items-center justify-center py-10 px-4 bg-card hover:bg-accent rounded-xl group"
      >
        <NuxtImg
          :src="client.logo.src"
          :alt="client.logo.alt"
          class="max-h-[64px] group-hover:hidden"
        />
        <h2 class="text-2xl font-bold hidden group-hover:flex">{{ client.name }}</h2>
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="border-2 border-dashed border-primary/20 col-span-6 sm:col-span-3 lg:col-span-2 flex flex-col items-center justify-center py-10 px-4 bg-primary/10 rounded-xl group"
      >
        <h2 class="text-2xl font-bold group-hover:hidden flex items-center gap-3">
          <span>You?</span>
          <Icon
            name="fluent-emoji:smiling-face-with-sunglasses"
            class="w-[32px] h-[32px] text-background"
          />
        </h2>
        <Button class="hidden group-hover:flex" size="xl">Let's talk business</Button>
      </NuxtLink>
    </div>
    <!-- <Motion
      as="div"
      initial="hidden"
      :animate="isInView ? 'visible' : 'hidden'"
      :transition="{
        type: 'spring',
        staggerChildren: 0.2,
      }"
      class="grid w-full grid-cols-12 gap-4 *:rounded-lg *:overflow-hidden *:col-span-12 *:md:col-span-6"
    >
      <Motion
        as-child
        :variants="items"
        v-for="client in data"
        :key="client.id"
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 10,
          duration: 0.1,
        }"
      >
        <NuxtLink
          :to="client.url"
          target="_blank"
          :class="[
            'client flex flex-col items-start h-full bg-card hover:ring-2 hover:ring-foreground/20 transition-all duration-200',
          ]"
        >
          <div class="img-container p-4 py-8 bg-stone-900 w-full">
            <img
              v-if="client.logo"
              :src="client.logo.src"
              :alt="client.logo.alt"
              class="max-h-[64px]"
            />
          </div>
          <div class="content p-4">
            <h2 class="text-2xl font-bold">{{ client.name }}</h2>
            <p class="text-base opacity-60 text-balance">
              {{ client.description }}
            </p>
          </div>
        </NuxtLink>
      </Motion>
      <Motion
        as-child
        :transition="{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }"
        :variants="items"
      >
        <NuxtLink
          to="/contact"
          :class="[
            'flex flex-col h-full bg-card/80 hover:ring-2 hover:ring-foreground/20 transition-all duration-200',
          ]"
        >
          <div class="img-container p-4 py-8 bg-primary w-full">
            <Icon
              name="fluent-emoji:smiling-face-with-sunglasses"
              class="w-[64px] h-[64px] text-background"
            />
          </div>
          <div class="content p-4">
            <h3 class="text-2xl font-bold text-primary">You?</h3>
            <p class="text-foreground/60 text-balance">
              It could be a start of something big
            </p>
            <Button class="mt-4">Say Hello</Button>
          </div>
        </NuxtLink>
      </Motion>
    </Motion> -->
  </section>
</template>

<script lang="ts" setup>
import type { easeOut, reverseEasing } from "motion-v";

const { data, status, error } = await useAsyncData("clients", () =>
  queryCollection("client").order("name", "DESC").all()
);

console.log({ data: data.value });
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
