<template>
  <ul class="flex flex-wrap items-center gap-2">
    <Badge
      v-for="tag in tags"
      :key="tag"
      as="li"
      variant="outline"
      class="slug h-auto rounded-none border-foreground/40 px-2 py-1 text-[0.6875rem] font-normal"
    >
      {{ tag }}
    </Badge>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ tags: string[] }>();
</script>
