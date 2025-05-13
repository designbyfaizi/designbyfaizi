<template>
  <component
    :is="as"
    :class="cn(buttonVariants({ variant, size, radius }), $attrs.class ?? '')"
    :whileHover="{ scale: animate ? 1.02 : 1 }"
    :whilePress="{ scale: animate ? 0.98 : 1 }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center leading-none text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-transparent hover:ring-primary/20",
        soft:
          "bg-card border border-secondary-foreground/10  text-secondary-foreground hover:bg-secondary/90 ring-2 ring-transparent hover:ring-secondary-foreground/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:ring-1 hover:ring-foreground/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 text-base px-4",
        sm: "h-8 text-sm px-3",
        lg: "h-11 text-base px-8",
        xl: "h-12 text-lg  px-10",
        xxl: "h-13 text-xl px-12",
        icon: "aspect-square",
      },
      radius: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "full",
    },
  }
);

type Props = {
  as?: any;
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
  radius?: NonNullable<Parameters<typeof buttonVariants>[0]>["radius"];
  animate?: boolean;
};

withDefaults(defineProps<Props>(), {
  as: motion.button,
  animate: true,
});
</script>
