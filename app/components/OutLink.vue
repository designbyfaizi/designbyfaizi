<template>
  <NuxtLink
    :to="to"
    target="_blank"
    rel="noopener noreferrer"
    class="group/link slug inline-flex items-center gap-1 normal-case underline underline-offset-4 hover:text-rose-ink"
  >
    <span><slot /></span>
    <Icon
      name="ic:outline-arrow-outward"
      class="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ to: string }>();
</script>
