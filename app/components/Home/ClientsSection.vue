<template>
  <section class="pt-[100px] space-y-4" ref="scope">
    <h1 class="text-4xl font-bold text-center">My Clients</h1>
    <ul class="flex flex-col sm:flex-row items-center justify-center gap-4 relative mx-auto">
      <div class="hidden w-full sm:flex p-8 rounded-xl bg-stone-200 dark:bg-stone-900/50 size-[128px]"></div>
      <li
        v-for="client in data"
        :key="client.name"
        :title="client.name"
        class="p-8 rounded-xl bg-stone-800 w-full flex items-center justify-center max-w-[320px]"
      >
        <NuxtImg
          :src="client.logo.src"
          :alt="client.logo.alt"
          class="max-h-[64px] group-hover:hidden rounded-lg"
        />
      </li>
      <div class="hidden w-full sm:flex p-8 rounded-xl bg-stone-200 dark:bg-stone-900/50 size-[128px]"></div>
      <div
        class="absolute inset-0 dark:sm:bg-gradient-to-r from-background via-transparent to-background pointer-events-none"
      ></div>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { easeOut, reverseEasing } from "motion-v";

const { data, status, error } = await useAsyncData("clients", () =>
  queryCollection("client").order("date", "ASC").all()
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
