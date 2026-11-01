<template>
  <DialogRoot v-model:open="isOpen">
    <span id="open-menu-label" hidden>Open menu</span>
    <DialogTrigger
      aria-labelledby="open-menu-label"
      class="slug border border-foreground px-3 py-2 before:content-['Menu'] md:hidden"
    />
    <DialogPortal>
      <DialogContent
        as-child
        aria-describedby=""
        class="fixed inset-0 z-[70] focus:outline-none"
      >
        <motion.div
          class="flex h-dvh w-screen flex-col justify-between overflow-y-auto bg-primary p-5 text-ink"
          :initial="{ clipPath: 'inset(0 0 100% 0)' }"
          :animate="{ clipPath: 'inset(0 0 0% 0)' }"
          :transition="{ duration: 0.5, ease: press }"
        >
          <DialogTitle class="sr-only">Menu</DialogTitle>
          <div class="flex items-center justify-between">
            <span class="slug">Design By Faizi</span>
            <DialogClose class="slug border border-ink px-3 py-2">Close</DialogClose>
          </div>
          <motion.ul
            class="my-8 flex flex-col gap-1"
            :variants="stagger(0.05, 0.15)"
            initial="hidden"
            animate="show"
          >
            <li v-for="navLink in links" :key="navLink.to" class="overflow-hidden">
              <motion.div :variants="line">
                <NuxtLink :to="navLink.to" class="display block text-[19vw]">{{ navLink.name }}</NuxtLink>
              </motion.div>
            </li>
          </motion.ul>
          <div class="slug flex items-end justify-between gap-4">
            <ThemeToggle />
            <a :href="`mailto:${site.email}`" class="text-right normal-case">{{ site.email }}</a>
          </div>
        </motion.div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import { gentle, press, stagger } from "@/lib/motion";

const route = useRoute();
const site = useSite();

const isOpen = ref(false);
const links = [{ name: "Home", to: "/" }, ...navLinks, { name: "Contact", to: "/contact" }];

const line = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: gentle },
};

watch(() => route.path, () => {
  isOpen.value = false;
});
</script>
