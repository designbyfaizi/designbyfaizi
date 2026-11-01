<template>
  <div class="relative z-10 -my-3 overflow-hidden" aria-hidden="true">
    <div class="-mx-4 -rotate-1 bg-primary py-3 text-ink">
      <div class="animate-marquee flex w-max hover:[animation-play-state:paused]">
        <div v-for="copy in 2" :key="copy" class="flex">
          <span
            v-for="item in repeated"
            :key="`${copy}-${item.key}`"
            class="display flex items-center gap-6 pr-6 text-3xl whitespace-nowrap md:text-5xl"
          >
            {{ item.text }}
            <svg class="size-5 md:size-7" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="3">
              <circle cx="18" cy="18" r="9" />
              <path d="M18 2v32M2 18h32" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ items: string[] }>();

const repeated = computed(() =>
  [...props.items, ...props.items].map((text, key) => ({ text, key })),
);
</script>
