<template>
  <footer class="overflow-hidden bg-foreground text-background">
    <ColorBar />
    <div class="sheet grid gap-10 py-12 md:grid-cols-12 md:py-16">
      <div class="md:col-span-5">
        <p class="font-serif text-2xl leading-snug italic md:text-3xl">{{ site.bio }}</p>
        <a :href="`mailto:${site.email}`" class="slug mt-5 inline-block normal-case underline underline-offset-4 hover:text-primary">
          {{ site.email }}
        </a>
      </div>
      <nav class="slug flex flex-col gap-2 md:col-span-2 md:col-start-7" aria-label="Footer">
        <span class="mb-2 opacity-70">Pages</span>
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="hover:text-primary">{{ link.name }}</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-primary">Contact</NuxtLink>
      </nav>
      <div class="slug flex flex-col gap-2 md:col-span-3">
        <span class="mb-2 opacity-70">Elsewhere</span>
        <a
          v-for="social in site.socials"
          :key="social.url"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="normal-case hover:text-primary"
        >
          {{ social.label }}
        </a>
      </div>
    </div>
    <div class="sheet slug flex flex-col justify-between gap-1 pb-4 opacity-60 md:flex-row">
      <span>{{ site.footer }}</span>
      <span>Set in Bricolage Grotesque, Newsreader &amp; JetBrains Mono. Printed in two inks.</span>
    </div>
    <!-- Sized to the sheet rather than the window so the words always fill the margins exactly. -->
    <div class="sheet @container">
      <p aria-hidden="true" class="display -mb-[0.1em] text-center text-[17cqw] whitespace-nowrap text-primary">
        Design By Faizi
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const site = useSite();
</script>
