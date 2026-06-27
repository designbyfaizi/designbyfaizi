<template>
  <Button
    aria-label="Toggle theme"
    size="icon"
    class="size-[40px] focus:ring focus:ring-1"
    variant="ghost"
    :class="[$attrs.class]"
    @click="toggleTheme"
  >
    <Icon
      :name="currentTheme.icon"
      class="min-w-[24px] min-h-[24px] aspect-square"
    />
  </Button>
</template>

<script lang="ts" setup>
import { useTheme } from "./useTheme";
const { currentTheme, toggleTheme } = useTheme();
</script>
