<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 w-full z-10 transition-all duration-200',
      isScrolled ? 'p-4' : 'p-0',
    ]"
  >
    <div
      :class="[
        'flex items-center justify-between gap-4 px-4 transition-all duration-200',
        'rounded-xl border',
        isScrolled
          ? 'py-2 bg-stone-100/80 dark:bg-stone-900/80 md:px-4 border-foreground/10 backdrop-blur-lg'
          : 'py-4 bg-transparent border-transparent md:px-8 backdrop-blur-none',
      ]"
    >
      <nav class="flex items-center gap-2 flex-1">
        <SiteLogo />
        <NuxtLink
          v-for="(navLink, index) in navLinks"
          :key="navLink.name"
          :to="navLink.to"
          :class="[
            'text-foreground hover:text-primary px-3 py-1 rounded-full hidden font-md md:inline aqler-press relative',
          ]"
          active-class="!text-primary"
        >
          <span class="relative z-2">
            {{ navLink.name }}
          </span>
          <motion.div
            v-if="navLink.to === $route.path"
            layout-id="nav-link-underline"
            class="bg-foreground/10 rounded-full absolute inset-0 z-1"
          >
          </motion.div>
        </NuxtLink>
      </nav>
      <ClientOnly>
        <ColorModeDropdown class="hidden md:flex" />
      </ClientOnly>
      <Button :as="nuxtLink" to="/contact" size="sm"> Say Hello! </Button>
      <HeaderMobileNav />
    </div>
  </header>
  <div class="header-underlay h-[64px] md:h-[70px]"></div>
</template>

<script setup>
const nuxtLink = resolveComponent("NuxtLink");
import { Motion, motion } from "motion-v";
const { y } = useWindowScroll();

const isScrolled = computed(() => {
  return y.value > 46;
});
</script>
