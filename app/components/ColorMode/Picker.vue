<template>
  <div class="grid grid-cols-3 gap-2">
    <Button
      v-for="theme in themes"
      :key="theme.name"
      :variant="store === theme.name ? 'default' : 'soft'"
      size="sm"
      @click="setTheme(theme.name)"
      :class="[theme.class, 'ring-none capitalize flex items-center gap-2 aqler-press']"
    >
      <Icon :name="theme.icon" class="size-[24px]" />
      <span>
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
