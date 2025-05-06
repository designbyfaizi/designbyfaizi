<template>
  <header :class="['fixed top-0 left-0 right-0 w-full z-10']">
    <div
      :class="[
        'flex items-center justify-between gap-4 px-6 md:px-8 transition-all duration-200',
        'backdrop-blur-lg border-b',
        isScrolled
          ? 'py-2 bg-stone-100/80 dark:bg-stone-900/80 border-b-stone-200 dark:border-b-stone-800'
          : 'py-4 bg-transparent border-b-transparent',
      ]"
    >
      <nav class="flex items-center gap-2 flex-1">
        <SiteLogo />
        <NuxtLink
          v-for="(navLink, index) in navLinks"
          :key="navLink.name"
          :to="navLink.to"
          :class="[
            'text-muted-foreground hover:text-foreground px-3 py-1 rounded-full hidden md:inline aqler-press',
          ]"
          active-class="!text-foreground bg-card ring-1 ring-foreground/10"
        >
          {{ navLink.name }}
        </NuxtLink>
      </nav>
      <ClientOnly>
        <ColorModeDropdown class="hidden md:flex" />
      </ClientOnly>
      <NuxtLink to="/contact">
        <Button size="sm"> Say Hello! </Button>
      </NuxtLink>
      <HeaderMobileNav />
    </div>
  </header>
  <div class="header-underlay h-[64px] md:h-[70px]"></div>
</template>

<script setup>
const { y } = useWindowScroll();

const isScrolled = computed(() => {
  return y.value > 46;
});
</script>
