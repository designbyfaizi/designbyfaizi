<template>
  <!-- An image with a Markdown title is a small sticker: shown at its own width, centered,
       with the title printed underneath as a slug. Spans, not figure, because Markdown
       wraps a lone image in a paragraph. -->
  <span v-if="title" class="mx-auto my-8 block w-fit max-w-full">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      format="webp"
      :sizes="`${width}px`"
      loading="lazy"
      decoding="async"
      class="!my-0 block h-auto max-w-full border-2 border-foreground"
      :style="{ width: `${width}px` }"
    />
    <span class="slug mt-2 block max-w-[min(100%,var(--w))] text-center text-muted-foreground" :style="{ '--w': `${width}px` }">
      {{ title }}
    </span>
  </span>
  <!-- Figures in posts: lazy, sized from the Markdown so nothing shifts while they load. -->
  <NuxtImg
    v-else
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    format="webp"
    sizes="sm:100vw md:800px"
    loading="lazy"
    decoding="async"
    class="h-auto w-full"
  />
</template>

<script setup lang="ts">
defineProps<{ src: string; alt?: string; title?: string; width?: string | number; height?: string | number }>();
</script>
