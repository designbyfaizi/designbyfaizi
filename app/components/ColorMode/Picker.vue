<template>
  <div class="flex items-center gap-2">
    <Button
      v-for="theme in themes"
      :key="theme.name"
      :variant="store === theme.name ? 'default' : 'soft'"
      size="sm"
      @click="setTheme(theme.name)"
      :class="[theme.class, 'ring-none capitalize flex items-center gap-2 p-1 h-fit w-fit']"
      :title="theme.name"
    >
    <div class="icon-container w-[36px] h-[36px] bg-foreground/10 rounded-full flex *:m-auto">
      <Icon :name="theme.icon" class="min-w-[24px] min-h-[24px] aspect-square" />
    </div>
      <span class="sr-only">
        {{ theme.name }}
      </span>
    </Button>
    <!-- <button @click="toggleTheme()" :class="['col-span-3 aqler-button-light']">Toggle</button> -->
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from "./useTheme";
const { store, themes, toggleTheme, setTheme } = useTheme();
</script>

<style></style>
