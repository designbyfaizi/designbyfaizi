<template>
  <div class="max-w-screen-md mx-auto">
    <TestTabs />
    <DialogRoot v-model:open="modalOpen">
      <DialogTrigger
        class="text-grass11 font-semibold hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-md bg-white px-[15px] leading-none shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-green8 focus:outline-none border"
      >
        {{ modalOpen }}
      </DialogTrigger>
      <DialogPortal>
        <AnimatePresence multiple>
          <DialogOverlay as-child>
            <Motion
              class="bg-neutral-900/60 backdrop-blur-lg fixed inset-0 z-30"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0 }"
            />
          </DialogOverlay>
          <DialogContent as-child>
            <Motion
              class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none z-[100]"
              :initial="{ opacity: 0, top: '48%' }"
              :animate="{ opacity: 1, top: '50%' }"
              :exit="{ opacity: 0, top: '48%' }"
            >
              <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                Edit profile
              </DialogTitle>
              <DialogDescription
                class="text-mauve11 mt-[10px] mb-5 text-sm leading-normal"
              >
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
              <fieldset class="mb-[15px] flex items-center gap-5">
                <label class="text-grass11 w-[90px] text-right text-sm" for="name">
                  Name
                </label>
                <input
                  id="name"
                  class="text-grass11 bg-stone-50 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  defaultValue="Pedro Duarte"
                />
              </fieldset>
              <fieldset class="mb-[15px] flex items-center gap-5">
                <label class="text-grass11 w-[90px] text-right text-sm" for="username">
                  Username
                </label>
                <input
                  id="username"
                  class="text-grass11 bg-stone-50 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  defaultValue="@peduarte"
                />
              </fieldset>
              <div class="mt-[25px] flex justify-end">
                <DialogClose as-child>
                  <button
                    class="bg-green4 text-green11 text-sm hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                  >
                    Save changes
                  </button>
                </DialogClose>
              </div>
              <DialogClose
                class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Icon icon="lucide:x" />
              </DialogClose>
            </Motion>
          </DialogContent>
        </AnimatePresence>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<script lang="ts" setup>
const modalOpen = ref(false);
import { AnimatePresence, motion, Motion } from "motion-v";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import { Icon } from "@iconify/vue";
const arts = [
  {
    id: "elzariah-lunaveil",
    name: "Elzariah Lunaveil",
    description:
      "Meet Elzariah, a character from my fantasy novel. While her story is still being written, I look forward to the day I can draw her for my web novel.",
    image_url: "/img/elzaria_lunaveil.png",
  },
];
</script>

<style></style>
