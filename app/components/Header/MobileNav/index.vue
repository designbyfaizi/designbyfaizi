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
        <div class="header h-[64px] flex items-center gap-4">
          <SiteLogo />
          <DialogClose
            as="button"
            class="aqler-button-light aspect-square size-[40px] p-0 flex items-center justify-center"
            aria-label="Close"
          >
            <Icon name="mdi:close" class="size-[24px]" />
          </DialogClose>
        </div>
        <NuxtLink
          v-for="navLink in navLinks"
          :key="navLink.to"
          :to="navLink.to"
          class="font-semibold hover:underline w-full bg-accent/20 border border-foreground/5 hover:bg-accent p-3 rounded-sm"
          active-class="border-l-2 border-l-foreground"
        >
          {{ navLink.name }}
        </NuxtLink>
        <ColorModePicker class="mt-auto" />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const route = useRoute();

watch(route, () => {
    isOpen.value = false;
})
</script>

<style></style>
