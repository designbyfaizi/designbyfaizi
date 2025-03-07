<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="theme in themes"
      :key="theme.name"
      @click="setTheme(theme.name)"
      :class="[
        theme.class,
        store === theme.name ? 'aqler-button' : 'aqler-button-light',
        'ring-none capitalize flex items-center gap-2 aqler-press',
      ]"
    >
      <Icon :name="theme.icon" class="size-[24px]" />
      <span>
        {{ theme.name }}
      </span>
    </button>
    <!-- <button @click="toggleTheme()" :class="['col-span-3 aqler-button-light']">Toggle</button> -->
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from "./useTheme";
const { store, themes, toggleTheme, setTheme } = useTheme();
</script>

<style></style>
