<template>
  <section id="intro" class="sheet py-20 md:py-32">
    <SheetLabel number="02" :title="site.intro.title" />
    <div class="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
      <div class="md:col-span-4">
        <div class="md:sticky md:top-24">
          <HalftonePhoto :src="site.intro.photo" :alt="site.intro.photo_alt" class="aspect-4/5 w-full" />
          <p class="slug mt-3 text-muted-foreground">
            Fig. 1 —
            <span class="pointer-coarse:hidden">Move over the drawing to develop it</span>
            <span class="hidden pointer-coarse:inline">Press and hold the drawing to develop it</span>
          </p>
        </div>
      </div>
      <div class="md:col-span-7 md:col-start-6">
        <InkStatement :text="site.intro.statement" />
        <div v-reveal class="mt-10 flex flex-col items-start gap-6 border-t pt-6 md:mt-16">
          <p class="font-serif text-2xl italic">{{ site.intro.note }}</p>
          <Button :as="NuxtLink" to="/contact">{{ site.intro.button_text }}</Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const NuxtLink = resolveComponent("NuxtLink");
const site = useSite();
</script>
