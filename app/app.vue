<template>
  <div class="relative flex min-h-svh flex-col">
    <SiteHeader />
    <NuxtLayout>
      <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
    <SiteFooter />
    <NoiseTexture />
    <InkWipe ref="wipe" />
    <ClientOnly>
      <InkCursor />
      <Toaster position="bottom-center" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import "vue-sonner/style.css";

const site = useSite();
useThemeSwitch();

const wipe = useTemplateRef("wipe");

useHead({
  titleTemplate: (title) => title || site.value.title,
  noscript: [{ innerHTML: "<style>[data-enter]{opacity:1!important;transform:none!important}</style>" }],
});

// Pages change like sheets going through the press: rose and black sweep over,
// then lift away to show the next page.
const pageTransition = {
  mode: "out-in" as const,
  css: false,
  onLeave(_el: Element, done: () => void) {
    (wipe.value?.cover() ?? Promise.resolve()).finally(done);
  },
  onEnter(_el: Element, done: () => void) {
    window.scrollTo({ top: 0, behavior: "instant" });
    (wipe.value?.reveal() ?? Promise.resolve()).finally(done);
  },
};
</script>
