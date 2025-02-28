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
        class="font-sans fixed top-1/2 left-1/2 h-dvh w-[100vw] translate-x-[-50%] translate-y-[-50%] px-3 pb-3 focus:outline-none z-[100] flex flex-col gap-2"
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
          class="header h-[64px] flex items-center gap-4"
        >
          <NuxtLink to="/">
            <Motion
              as="span"
              :variants="headerItems"
              class="size-[50px] flex items-center justify-center bg-card rounded-sm border-border aqler-button-light !p-0"
            >
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
            delayChildren: 0.5,
            staggerChildren: 0.1,
          }"
          class="flex flex-col gap-2 flex-1 text-muted-foreground"
        >
          <NuxtLink
            v-for="navLink in navLinks"
            :key="navLink.to"
            :to="navLink.to"
            class="text-3xl font-semibold w-full hover:text-foreground/80"
            active-class="text-foreground"
          >
            <Motion as="span" :variants="navItems">
              {{ navLink.name }}
            </Motion>
          </NuxtLink>
          <Motion as="div" class="mt-auto" :variants="navItems">
            <ColorModePicker />
          </Motion>
        </Motion>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const route = useRoute();

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
    padding: "10px",
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    padding: "0px",
    opacity: 1,
    filter: "blur(0px)",
  },
};

watch(route, () => {
  isOpen.value = false;
});
</script>

<style></style>
