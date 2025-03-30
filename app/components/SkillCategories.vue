<template>
  <div class="grid grid-cols-12 gap-4">
    <PixelCard
      v-for="category in categories"
      :key="category.id"
      :as="nuxtLink"
      :to="`/skills/${category?.slug}`"
      class="col-span-12"
    >
      <div class="p-4">
        <h3 class="card-title text-2xl leading-[40px] mb-10 font-semibold">
          {{ category.name }}
        </h3>
        <ul class="flex items-center flex-wrap gap-8">
          <li
            v-for="skill in category.skills"
            :key="skill.name"
            class="rounded-full flex items-center gap-2"
          >
            <Icon v-if="skill.icon" :name="skill.icon" class="size-[24px]" />
            <span>
              {{ skill.name }}
            </span>
          </li>
        </ul>
      </div>
    </PixelCard>
  </div>
</template>

<script lang="ts" setup>
import type { SkillsCollectionItem } from '@nuxt/content';

const nuxtLink = resolveComponent("NuxtLink");

type Props = {
  categories?: SkillsCollectionItem[];
};
defineProps<Props>();
</script>

<style></style>
