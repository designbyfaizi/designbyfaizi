<template>
  <PopoverRoot :open-delay="100" v-model:open="isOpen">
    <PopoverTrigger aria-label="Change theme" as-child @click="toggleHoverCard">
      <Button size="icon" class="size-[40px]" variant="soft" :class="[$attrs.class]">
        <Icon
          :name="currentTheme.icon"
          class="min-w-[24px] min-h-[24px] aspect-square"
        />
      </Button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        side="left"
        class="w-[320px] rounded-full bg-card/80 backdrop-blur-lg p-2 border shadow-sm z-10 border-foreground/20 font-sans"
        :side-offset="5"
      >
        <ColorModePicker />
        <HoverCardArrow
          class="fill-card stroke-card-foreground/20 -mt-[0.2px]"
          :width="10"
          :height="8"
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
