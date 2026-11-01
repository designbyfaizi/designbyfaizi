<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b bg-background/85 backdrop-blur-md">
    <div class="sheet flex h-14 items-center justify-between gap-6">
      <SiteLogo />
      <nav class="hidden items-center gap-7 md:flex" aria-label="Main">
        <NuxtLink
          v-for="navLink in navLinks"
          :key="navLink.to"
          :to="navLink.to"
          class="slug relative flex items-center py-1 transition-colors hover:text-rose-ink"
        >
          <motion.span
            v-if="activePath === navLink.to"
            layout-id="nav-marker"
            class="absolute -left-3 size-1.5 bg-primary"
            :transition="snappy"
          />
          {{ navLink.name }}
        </NuxtLink>
      </nav>
      <div class="flex items-center gap-4">
        <span class="slug hidden text-muted-foreground lg:block">
          Sheet <span class="text-foreground tabular-nums">{{ sheet }}</span>
        </span>
        <ThemeToggle class="hidden md:flex" />
        <Button :as="NuxtLink" to="/contact" size="sm" class="hidden sm:inline-flex">Say Hello!</Button>
        <MobileNav />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { snappy } from "@/lib/motion";

const NuxtLink = resolveComponent("NuxtLink");
const route = useRoute();
const sheet = useState("sheet", () => "01");

// Blog posts and skill pages keep their section lit in the menu.
const activePath = computed(() => `/${route.path.split("/")[1] ?? ""}`);

watch(() => route.path, () => {
  sheet.value = "01";
});
</script>
