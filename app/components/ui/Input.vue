<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
        'file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium',
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/utils/cn";
import { useVModel } from "@vueuse/core";

type Props = {
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
};
const props = defineProps<Props>();

type Emits = {
  (e: "update:modelValue", payload: string | number): void;
};
const emits = defineEmits<Emits>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>
