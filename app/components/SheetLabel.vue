<template>
  <div ref="label" v-reveal class="slug flex items-baseline gap-3">
    <span class="text-rose-ink">Sheet {{ number }}</span>
    <span class="h-px flex-1 bg-foreground/25" />
    <component :is="as" class="font-normal">{{ title }}</component>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

const props = withDefaults(defineProps<{ number: string; title: string; as?: string }>(), {
  as: "h2",
});

const label = useTemplateRef("label");
const current = useState("sheet", () => "01");

// Tells the header which sheet is being read.
useIntersectionObserver(
  label,
  ([entry]) => {
    if (entry?.isIntersecting) current.value = props.number;
  },
  { rootMargin: "-10% 0px -60% 0px" },
);
</script>
