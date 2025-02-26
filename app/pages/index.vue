<template>
  <main class="">
    <section
      v-for="section in 1"
      :key="section"
      class="min-h-[400px] h-[70dvh] bg-neutral-200 dark:bg-neutral-800 rounded-lg p-4 flex flex-col items-center justify-center gap-4"
    >
      <p class="max-w-screen-sm text-2xl text-center">
        Inspired by Eagles, Created for Visionaries
      </p>
      <ToastProvider>
        <button @click="handleClick" :class="['aqler-button']">Contact Us</button>
        <ToastRoot
          v-model:open="open"
          class="bg-card/80 backdrop-blur-lg rounded-lg shadow-sm border border-border p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        >
          <ToastTitle
            class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-sm"
          >
            Email Copied
          </ToastTitle>
          <ToastDescription as-child>
            <time
              class="[grid-area:_description] m-0 text-slate11 text-xs leading-[1.3]"
              :dateTime="eventDateRef.toISOString()"
            >
              faizanullah1999@gmail.com
            </time>
          </ToastDescription>
        </ToastRoot>
        <ToastViewport
          class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
        />
      </ToastProvider>
    </section>
  </main>
</template>

<script lang="ts" setup>
const email = "faizanullah1999@gmail.com"
const { text, copy, isSupported } = useClipboard({ source: email });
const open = ref(false);
const eventDateRef = ref(new Date());
const timerRef = ref(0);

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function handleClick() {
  copy(email)
  open.value = false;
  window.clearTimeout(timerRef.value);
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway();
    open.value = true;
  }, 100);
}
</script>
