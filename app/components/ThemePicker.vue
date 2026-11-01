<template>
  <div class="flex items-center gap-2">
    <Button
      v-for="theme in themes"
      :key="theme.name"
      :variant="current === theme.name ? 'default' : 'soft'"
      class="h-fit w-fit gap-2 p-1 capitalize"
      :title="theme.name"
      @click="setTheme(theme.name, $event)"
    >
      <span class="flex size-9 rounded-full bg-foreground/10 *:m-auto">
        <Icon :name="theme.icon" class="size-6" />
      </span>
      <span class="sr-only">{{ theme.name }}</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
const { current, setTheme } = useThemeSwitch();
</script>
