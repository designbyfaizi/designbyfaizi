<template>
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
</template>

<script lang="ts" setup>
const scope = ref(null);
const isInView = useInView(scope, {
  amount: 0.7,
  once: true,
});

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
</script>

<style></style>
