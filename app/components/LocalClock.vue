<template>
  <span class="tabular-nums">
    <ClientOnly>
      {{ time }}
      <template #fallback>--:--:--</template>
    </ClientOnly>
    {{ place }}
  </span>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";

const props = defineProps<{ timezone: string }>();

const place = computed(() => props.timezone.split("/").pop()?.replace("_", " "));
// Building a formatter is slow, so one is made per time zone and reused every tick.
const formatter = computed(
  () => new Intl.DateTimeFormat("en-GB", { timeZone: props.timezone, timeStyle: "medium" }),
);
const read = () => formatter.value.format(new Date());

const time = ref("");

onMounted(() => {
  time.value = read();
  useIntervalFn(() => {
    time.value = read();
  }, 1000);
});
</script>
