<template>
  <section class="flex flex-col justify-center rounded-xl py-20">
    <div
      class="flex flex-col items-center justify-center max-w-lg mx-auto text-center gap-8 flex-1"
    >
      <!-- Image -->
      <NuxtImg
        src="/img/faizan_updated_pic_transparent_bg.png"
        alt="Faizan's Profile Picture"
        class="w-[80px] h-[80px] rounded-full bg-stone-200 !aspect-square object-cover outline outline-foreground/20 outline-1 outline-offset-2"
        :height="400"
      />
      <!-- Heading -->
      <h1 class="text-4xl font-800 leading-[1.2em] opacity-80" v-html="hero_heading"></h1>
      <!-- Paragraph -->
      <p class="text-muted-foreground">{{ hero_description }}</p>
      <!-- Buttons -->
      <!-- <div class="flex gap-4 items-center">
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
      </div> -->
      <!-- Availability Text -->
      <NuxtLink to="/contact" class="flex gap-2 items-center text-green-500 hover:bg-green-500/10 px-3 py-2 rounded-xl cursor-pointer focus:ring-1 ring-green-500/60 outline-none">
        <div class="dot size-[10px] rounded-full bg-green-500 relative">
        <div class="absolute inset-0 bg-green-500 animate-ping rounded-full"></div>
        </div>
        <p class="font-500">{{ availability_text }}</p>
      </NuxtLink>
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
