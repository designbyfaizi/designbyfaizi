<template>
  <section
    class="flex flex-col justify-center h-full min-h-[640px] md:min-h-[720px] -mt-[70px]"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 md:gap-16 flex-1"
    >
      <Motion
        as="div"
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
      </Motion>
      <Motion
        as="div"
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
        <Motion
          :variants="items"
          as="h1"
          class="uppercase font-bold text-4xl md:text-5xl tracking-tight text-primary leading-[0.7em]"
        >
          Hi, I'm Faizi
        </Motion>
        <Motion
          :variants="items"
          as="p"
          class="text-[24px] md:text-[32px] leading-[1em] font-medium text-balance"
        >
          I'm a software engineer based in Marburg.
        </Motion>
        <div class="flex flex-col md:flex-row items-center gap-2 mt-4">
          <ToastProvider>
            <Motion :variants="items" as="button" @click="handleClick" class="">
              <span class="aqler-button-light flex items-center justify-between gap-4">
                <p>
                  {{ email }}
                </p>
                <Icon
                  :name="copied ? 'solar:copy-bold-duotone' : 'solar:copy-linear'"
                  class="size-[20px] text-foreground/60"
                />
              </span>
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
                  faizanullah1999@gmail.com
                </p>
              </ToastDescription>
            </ToastRoot>
            <ToastViewport
              class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
            />
          </ToastProvider>
          <NuxtLink to="/contact" class="aqler-press">
            <Motion :variants="items" as="button">
              <span class="aqler-button font-semibold"> Contact Me </span>
            </Motion>
          </NuxtLink>
        </div>
      </Motion>
    </div>
  </section>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
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
