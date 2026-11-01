<template>
  <div>
    <Tabs v-model="active">
      <TabsList class="h-auto w-full flex-wrap justify-start gap-x-1 gap-y-1 rounded-none bg-transparent p-0">
        <TabsTrigger
          v-for="group in groups"
          :key="group.key"
          :value="group.key"
          class="slug relative h-auto flex-none rounded-none border-0 px-3 py-2 data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent"
          :class="active === group.key ? 'dark:!text-ink' : ''"
        >
          <motion.span
            v-if="active === group.key"
            layout-id="skill-tab"
            class="absolute inset-0 bg-primary"
            :transition="snappy"
          />
          <span class="relative">{{ group.label }}</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <motion.ul layout class="mt-6 grid grid-cols-3 border-t border-l sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
      <AnimatePresence mode="popLayout" :initial="false">
        <motion.li
          v-for="tool in visibleTools"
          :key="tool.name"
          layout
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.9 }"
          :transition="snappy"
        >
          <SkillSwatch :tool="tool" />
        </motion.li>
      </AnimatePresence>
    </motion.ul>
  </div>
</template>

<script setup lang="ts">
import type { SkillCollectionItem } from "@nuxt/content";
import { AnimatePresence, motion } from "motion-v";
import { snappy } from "@/lib/motion";

const props = defineProps<{ categories: SkillCollectionItem[] }>();

const active = ref("all");

const groups = computed(() => [
  { key: "all", label: "Everything" },
  ...props.categories.map((category) => ({ key: category.stem, label: category.name })),
]);

const visibleTools = computed(() => {
  const chosen = props.categories.filter(
    (category) => active.value === "all" || category.stem === active.value,
  );
  const tools = chosen.flatMap((category) => category.skills);
  return [...new Map(tools.map((tool) => [tool.name, tool])).values()];
});
</script>
