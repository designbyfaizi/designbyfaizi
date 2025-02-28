<template>
  <main class="flex-1 flex flex-col">
    <section
      class="flex flex-col items-center justify-center h-full min-h-[640px] md:min-h-[720px] -mt-[70px]"
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
            Hey, I'm Faizi
          </Motion>
          <Motion
            :variants="items"
            as="p"
            class="text-[24px] md:text-[32px] leading-[1em] font-medium"
          >
            I turn coffee and code into cool things on the internet.
          </Motion>
          <div class="flex flex-col md:flex-row items-center gap-2 mt-4">
            <ToastProvider>
              <Motion
                :variants="items"
                as="button"
                @click="handleClick"
                class="aqler-button-light flex items-center justify-between gap-4"
              >
                <span>
                  {{ email }}
                </span>
                <Icon name="solar:copy-linear" class="size-[20px] text-foreground/60" />
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
            <NuxtLink to="/contact">
              <Motion :variants="items" as="button" class="aqler-button font-semibold">
                Contact Me
              </Motion>
            </NuxtLink>
          </div>
        </Motion>
      </div>
    </section>
    <section ref="scope" class="pt-4 flex flex-col">
      <Motion
        as="div"
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
          delay: 2,
          duration: 0.4,
          scale: {
            type: 'spring',
            visualDuration: 0.4,
            bounce: 0.5,
          },
        }"
        class="icon-container flex justify-center"
      >
        <Icon
          name="solar:square-arrow-down-line-duotone"
          class="size-[40px] text-foreground/40 animate-bounce"
        />
      </Motion>
      <Motion
        as="div"
        initial="hidden"
        :animate="isInView ? 'visible' : 'hidden'"
        :transition="{
          type: 'spring',
          staggerChildren: 0.2,
        }"
        class="scroll-section py-[32px] text-[22px] md:text-[28px] leading-tight font-medium flex flex-col gap-4 items-center"
      >
        <Motion as="p" :variants="items" class="max-w-[600px] w-full pt-[50px]">
          I am a frontend <b>developer</b><br />
          and UI/UX <b>designer</b>, crafting<br />
          <b>sleek</b> and <b>scalable</b> web experiences.
        </Motion>
        <Motion as="p" :variants="items" class="max-w-[600px] w-full">
          With expertise in modern frameworks and design tools, I build <b>fast</b>,
          <b>intuitive</b>, and <b>visually polished</b> interfaces.
        </Motion>
      </Motion>
    </section>
  </main>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const title = "Design By Faizi";
const description =
  "I am a frontend developer and UI/UX designer, crafting sleek and scalable web experiences.";
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `blob:https://dash.cloudflare.com/e6ea36da-46e6-463b-9012-660fad88bbd3`,
  ogUrl: config.public.site_url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `blob:https://dash.cloudflare.com/e6ea36da-46e6-463b-9012-660fad88bbd3`,
  twitterCard: "summary_large_image",
});
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
const email = "faizanullah1999@gmail.com";
const { text, copy, isSupported } = useClipboard({ source: email });
const open = ref(false);
const eventDateRef = ref(new Date());
const timerRef = ref(0);

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

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

const scope = ref(null);
const isInView = useInView(scope, {
  amount: 0.7,
  once: false,
});

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
