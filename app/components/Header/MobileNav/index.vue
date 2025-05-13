<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger
      as="button"
      class="aqler-button-light block md:hidden *:size-[24px] size-[40px] flex items-center justify-center !p-0"
    >
      <Icon name="solar:hamburger-menu-broken" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-background/80 backdrop-blur-lg fixed inset-0 z-30" />
      <DialogContent
        class="fixed top-1/2 left-1/2 h-dvh w-[100vw] translate-x-[-50%] translate-y-[-50%] px-6 md:px-8 pb-3 focus:outline-none z-[100] flex flex-col gap-2"
      >
        <!-- <DialogTitle>Links</DialogTitle>
        <DialogDescription> View Links </DialogDescription> -->
        <Motion
          :variants="container"
          initial="hidden"
          animate="visible"
          :transition="{
            type: 'spring',
            staggerChildren: 0.1,
          }"
          :class="[
            'header flex items-center justify-between gap-4',
            isScrolled ? 'py-2' : 'py-4',
          ]"
        >
          <NuxtLink to="/" class="aqler-press px-2">
            <Motion as="span" :variants="headerItems" class="">
              <SiteIconSvg class="size-[32px]" />
            </Motion>
          </NuxtLink>
          <DialogClose as="button" aria-label="Close">
            <Motion
              as="span"
              :variants="navItems"
              class="aqler-button-light aspect-square size-[40px] p-0 flex items-center justify-center"
            >
              <Icon name="mdi:close" class="size-[24px]" />
            </Motion>
          </DialogClose>
        </Motion>
        <Motion
          as="ul"
          :variants="container"
          initial="hidden"
          animate="visible"
          :transition="{
            type: 'spring',
            delayChildren: 0.2,
            staggerChildren: 0.05,
          }"
          class="flex flex-col gap-2 flex-1 text-foreground/90"
        >
          <motion.li v-for="navLink in navLinks" :key="navLink.to" :variants="navItems">
            <NuxtLink
              :to="navLink.to"
              class="text-4xl font-semibold w-full hover:text-primary/80"
              active-class="text-primary"
            >
              <span>
                {{ navLink.name }}
              </span>
            </NuxtLink>
          </motion.li>
          <Motion as="div" class="mt-auto" :variants="navItems">
            <ColorModePicker />
          </Motion>
        </Motion>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script lang="ts" setup>
import { Motion, motion } from "motion-v";
const isOpen = ref(false);
const route = useRoute();

const { y } = useWindowScroll();

const isScrolled = computed(() => {
  return y.value > 46;
});

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const headerItems = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
  },
};
const navItems = {
  hidden: {
    paddingLeft: "10px",
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    paddingLeft: "0px",
    opacity: 1,
    filter: "blur(0px)",
  },
};

watch(route, () => {
  isOpen.value = false;
});
</script>

<style></style>
