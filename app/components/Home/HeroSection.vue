<template>
  <section class="flex flex-col justify-center rounded-xl py-20">
    <div
      class="flex flex-col items-center justify-center max-w-lg mx-auto text-center gap-8 flex-1"
    >
      <!-- Image -->
      <NuxtImg
        src="/img/faizan_updated_pic_transparent_bg.png"
        alt="Faizan's Profile Picture"
        class="w-[100px] h-[100px] rounded-full bg-stone-200 !aspect-square object-cover"
        :height="400"
      />
      <!-- Heading -->
      <h1 class="text-5xl font-800 leading-[1.2em] opacity-80" v-html="hero_heading"></h1>
      <!-- Paragraph -->
      <p class="text-muted-foreground">{{ hero_description }}</p>
      <!-- Buttons -->
      <div class="flex gap-4 items-center">
        <NuxtLink :to="`mailto:${email}`">
          <Button variant="soft" class="gap-4" :animate="false">
            <p>
              {{ email }}
            </p>
          </Button>
        </NuxtLink>
        <NuxtLink :to="button_link">
          <Button>{{ button_text }}</Button>
        </NuxtLink>
      </div>
      <!-- Availability Text -->
      <div class="flex gap-2 items-center text-green-500">
        <div class="dot size-[10px] rounded-full bg-green-500 relative">
        <div class="absolute inset-0 bg-green-500 animate-ping rounded-full"></div>
        </div>
        <p class="font-500">{{ availability_text }}</p>
      </div>
      <!-- <motion.div
        class="image-container relative size-[100px] md:size-[180px] rounded-full aspect-square bg-card flex items-center justify-center border-dashed border-1 border-foreground/10"
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
        <div class="w-full h-full overflow-hidden rounded-full">
          <NuxtImg
            src="/img/faizan_updated_pic_transparent_bg.png"
            alt="Faizan's Profile Picture"
            class="w-full h-full scale-120 !aspect-square object-cover"
            :height="400"
          />
        </div>
        <div
          class="absolute small-icons flex gap-2 items-center justify-center left-1/2 -translate-x-1/2 -bottom-4 bg-card/50 backdrop-blur-md w-fit p-2 rounded-full"
        >
          <TooltipProvider v-for="country in countries" :key="country.name">
            <TooltipRoot>
              <TooltipTrigger as-child class="">
                <Icon
                  :name="country.icon"
                  class="size-8 outline outline-transparent hover:outline-card-foreground rounded-full outline-1 transition-all duration-200 -outline-offset-1"
                />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent
                  side="bottom"
                  class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-grass11 select-none rounded-md bg-card/50 border border-card backdrop-blur-md px-[15px] py-[10px] text-sm leading-none shadow-sm will-change-[transform,opacity]"
                  :side-offset="5"
                >
                  <span>{{ country.description }}</span>
                  <TooltipArrow
                    class="fill-card"
                    :width="12"
                    :height="6"
                  />
                </TooltipContent>
              </TooltipPortal>
            </TooltipRoot>
          </TooltipProvider>
        </div>
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
      </motion.div> -->
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
  availability_text: {
    style: String,
    default: "Available",
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

const countries = [
  {
    name: "Germany",
    icon: "emojione:flag-for-germany",
    description: "Hallo, ich lebe in Deutschland 👋",
  },
  {
    name: "Pakistan",
    icon: "emojione:flag-for-pakistan",
    description: "My motherland 💚",
  },
];
</script>

<style></style>
