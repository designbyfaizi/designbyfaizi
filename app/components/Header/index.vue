<template>
  <header :class="['fixed top-0 w-full left-1/2 -translate-x-1/2 z-10']">
    <div
      :class="[
        'flex items-center justify-between gap-4 py-3 px-3 md:px-8 h-[64px] md:h-[70px]',
        'bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-b-neutral-200 dark:border-b-neutral-800',
      ]"
    >
      <nav class="flex items-center gap-2 flex-1">
        <SiteLogo class="me-2" />
        <HeaderMobileNav />
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
      <NuxtLink to="/contact" :class="['aqler-button font-semibold']">Contact</NuxtLink>
    </div>
  </header>
  <div class="header-underlay h-[64px] md:h-[70px]"></div>
</template>
