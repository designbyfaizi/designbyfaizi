<template>
  <div class="relative flex min-h-dvh flex-col">
    <SiteHeader />
    <main class="sheet relative flex flex-1 flex-col justify-center overflow-hidden pt-24 pb-16">
      <CropMarks />
      <p class="slug text-rose-ink">Misprint</p>
      <h1 class="mt-6">
        <OverprintText :text="String(error?.statusCode ?? 404)" class="mega" :plate="26" />
      </h1>
      <p class="mt-8 max-w-xl font-serif text-3xl leading-tight">
        The plates slipped and this page never made it onto the sheet.
      </p>
      <div class="mt-8">
        <Button variant="rose" size="lg" @click="clearError({ redirect: '/' })">Back to the first sheet</Button>
      </div>
    </main>
    <SiteFooter />
    <NoiseTexture />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

useHead({ title: "Not found - Design By Faizi" });
</script>
