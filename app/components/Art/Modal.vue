<template>
  <DialogRoot>
    <DialogTrigger :as-child="true">
      <slot />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-background/60 backdrop-blur-lg data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-fit translate-x-[-50%] translate-y-[-50%] focus:outline-none z-[100]"
      >
        <article
          class="flex flex-col md:flex-row justify-center max-w-screen-lg w-[90vw] rounded-2xl overflow-hidden border border-foreground/20"
        >
          <img
            :src="art.image_url"
            :alt="art.name"
            class="h-full w-full md:max-w-[90%] md:min-w-[50%] object-cover"
          />
          <div
            class="content space-y-2 bg-accent/60 p-4 w-full md:max-w-[400px]"
          >
            <h2 class="text-2xl font-semibold">{{ art.name }}</h2>
            <p class="text-balance">
              {{ art.description }}
            </p>
          </div>
        </article>
        <DialogClose
          class="text-neutral-900 bg-neutral-200 hover:bg-neutral-900 hover:text-neutral-100 focus:shadow-neutral-300 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <Icon name="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script lang="ts" setup>
type Props = {
  art: {
    name: string;
    description: string;
    image_url: string;
  };
};
defineProps<Props>();
</script>

<style></style>
