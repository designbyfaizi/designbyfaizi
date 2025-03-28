<template>
  <div class="grid grid-cols-12 gap-4">
    <PixelCard
      v-for="category in categories"
      :key="category.id"
      :as="nuxtLink"
      :to="`/skills/${category?.slug}`"
      :title="category.name"
      class="col-span-12 md:col-span-6 xl:col-span-4"
    />
  </div>
</template>

<script lang="ts" setup>
const nuxtLink = resolveComponent("NuxtLink")

type Props = {
    categories?: SkillCategory[]
}
defineProps<Props>()

</script>

<style></style>
