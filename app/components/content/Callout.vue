<template>
  <div class="callout">
    <h2 v-if="$slots.title" class="text-green-500">
      <slot name="title" mdc-unwrap="p" />
    </h2>
    <slot />
  </div>
</template>
