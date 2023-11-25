<template>
    <component
        :is="as"
        :class="[
            `font-500 flex items-center`,
            'active:(scale-98) transition-all duration-100 ease-in-out',
            _variants[variant],
            _sizes[size],
            _radii[radius],
            fullWidth && 'block w-full',
        ]"
    >
        <component :is="leftSection" />
        <slot></slot>
        <slot name="rightSection" />
    </component>
</template>

<script setup lang="ts">
import { type Component } from "vue";

interface Props {
    variant?: keyof typeof _variants;
    size?: keyof typeof _sizes;
    radius?: keyof typeof _radii;
    fullWidth?: boolean;
    leftSection?: HTMLElement | Component | JSX.Element | string;
    as?: HTMLElement | Component | JSX.Element | string;
}

withDefaults(defineProps<Props>(), {
    variant: "default",
    size: "md",
    radius: "md",
    fullWidth: false,
    as: "button",
});

const _variants = {
    default: "bg-background-second hover:bg-background-light text-light",
    filled: "bg-primary hover:bg-primary-light border-1 border-primary-dark text-background",
};

const _sizes = {
    xs: "text-[12px] px-[14px] h-[30px] gap-[10]",
    sm: "text-[14px] px-[18px] h-[36px] gap-[12px]",
    md: "text-[16px] px-[22px] h-[42px] gap-[16px]",
    lg: "text-[18px] px-[26px] h-[50px] gap-[20px]",
    xl: "text-[20px] px-[32px] h-[60px] gap-[32px]",
};

const _radii = {
    xs: "rounded-[2px]",
    sm: "rounded-[4px]",
    md: "rounded-[8px]",
    lg: "rounded-[16px]",
    xl: "rounded-[32px]",
};
</script>

<style lang="scss">
.sada-button::before {
    border: 1px solid aqua;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
}
</style>
