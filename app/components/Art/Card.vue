<template>
  <button class="rounded-2xl overflow-hidden group relative border border-foreground/20">
    <img
      :src="art.image_url"
      :alt="art.name"
      class="group-hover:scale-105 opacity-90 group-hover:opacity-100 transition-all duration-200 aspect-square object-cover relative z-10"
      :width="1000"
    />
    <div
      :class="[
        'content text-left absolute z-20 bottom-2 left-2 right-2 text-neutral-900 bg-neutral-100/20 border border-neutral-400/40 backdrop-blur-md',
        'p-4 group-hover:p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-md',
      ]"
    >
      <h2 class="text-2xl font-semibold">{{ art.name }}</h2>
      <p class="overflow-hidden text-ellipsis line-clamp-2">{{ art.description }}</p>
    </div>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  art: {
    name: string;
    description: string;
    image_url: string;
  };
};
defineProps<Props>();
</script>

<style></style>
