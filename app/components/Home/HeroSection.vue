<template>
  <section
    class="flex flex-col justify-center h-full min-h-[640px] md:min-h-[720px] -mt-[70px]"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-16 flex-1"
    >
      <motion.div
        class="logo-container size-[100px] md:size-[180px] rounded-full aspect-square bg-primary flex items-center justify-center"
        :initial="{
          opacity: 0,
          scale: 0,
          filter: 'blur(16px)',
        }"
        :animate="{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          duration: 0.4,
          scale: {
            type: 'spring',
            visualDuration: 0.4,
            bounce: 0.5,
          },
        }"
      >
        <SiteIconSvg class="size-[80px] md:size-[140px] text-background" />
      </motion.div>
      <motion.div
        :variants="container"
        initial="hidden"
        animate="visible"
        :transition="{
          type: 'spring',
          delayChildren: 0.5,
          staggerChildren: 0.2,
        }"
        class="flex flex-col gap-2 max-w-[320px] md:max-w-[500px] w-full"
      >
        <motion.h1
          :variants="items"
          class="uppercase font-bold text-4xl md:text-5xl tracking-tight text-primary leading-[0.7em]"
        >
          {{ hero_heading }}
        </motion.h1>
        <motion.p
          :variants="items"
          class="text-[24px] md:text-[32px] leading-[1em] font-medium text-balance"
        >
          {{ hero_description }}
        </motion.p>
        <div class="flex flex-col md:flex-row items-center gap-2 mt-4">
          <ToastProvider>
            <Motion as-child :variants="items" class="">
              <Button @click="handleClick" variant="soft" class="gap-4">
                <p>
                  {{ email }}
                </p>
                <Icon
                  :name="copied ? 'solar:copy-bold-duotone' : 'solar:copy-linear'"
                  class="size-[20px] text-foreground/60"
                />
              </Button>
            </Motion>
            <ToastRoot
              v-model:open="open"
              class="bg-card/80 text-left backdrop-blur-lg rounded-lg shadow-sm border border-border p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            >
              <ToastTitle
                class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-sm"
              >
                Email Copied
              </ToastTitle>
              <ToastDescription as-child>
                <p
                  class="[grid-area:_description] m-0 text-slate11 text-xs leading-[1.3]"
                >
                  {{ email }}
                </p>
              </ToastDescription>
            </ToastRoot>
            <ToastViewport
              class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
            />
          </ToastProvider>
          <NuxtLink :to="button_link" class="aqler-press">
            <Motion :variants="items" as-child>
              <Button>{{ button_text }}</Button>
            </Motion>
          </NuxtLink>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const props = defineProps({
  hero_heading: {
    type: String,
    default: "Hero Heading",
  },
  hero_description: {
    type: String,
    default: "Hero Description",
  },
  email: {
    type: String,
    default: "faizanullah1999@gmail.com",
  },
  button_text: {
    type: String,
    default: "Button Text",
  },
  button_link: {
    type: String,
    default: "/",
  },
});
import { Motion, motion } from "motion-v";
const {
  public: { email },
} = config;
const { text, copy, isSupported, copied } = useClipboard({ source: email });
const open = ref(false);
const eventDateRef = ref(new Date());
const timerRef = ref(0);

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const items = {
  hidden: {
    y: 20,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
};

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function handleClick() {
  copy(email);
  open.value = false;
  window.clearTimeout(timerRef.value);
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway();
    open.value = true;
  }, 100);
}
</script>

<style></style>
