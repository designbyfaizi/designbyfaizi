<template>
  <PopoverRoot :open-delay="100" v-model:open="isOpen">
    <PopoverTrigger
      aria-label="Change theme"
      as="button"
      @click="toggleHoverCard"
      :class="[
        'aqler-button-light size-[40px] !px-0 items-center justify-center',
        $attrs.class,
      ]"
    >
      <Icon :name="currentTheme.icon" class="min-w-[24px] min-h-[24px] size-[24px] aspect-square" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="bottom"
        align="end"
        class="w-[320px] rounded-lg bg-card/80 backdrop-blur-lg p-2 border shadow-sm z-10 border-foreground/20 font-sans"
        :side-offset="5"
      >
        <ColorModePicker />
        <HoverCardArrow
          class="fill-card stroke-card-foreground/20 -mt-[0.2px]"
          :width="12"
          :height="6"
        />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<script lang="ts" setup>
import { useTheme } from "./useTheme";
const { themes, currentTheme } = useTheme();

const isOpen = ref(false);

const toggleHoverCard = () => {
  isOpen.value = !isOpen.value;
};
</script>
