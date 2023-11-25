<template>
        <component
            v-bind="$attrs"
            :is="props.is"
            :class="[
                animated && `animated bg-[length:200%]`,
                'bg-gradient-to-r from-primary via-primary-darker to-primary bg-clip-text text-transparent',
                'inline select-none',
                'transition-transform duration-100',
            ]"
        >
            <slot>
                {{ props.text }}
            </slot>
        </component>
</template>

<script lang="ts" setup>
interface Props {
    is?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    text?: string;
    animated: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    is: "h1",
    animated: false,
});
</script>

<style lang="scss">
@keyframes background-pan {
    from {
        background-position: 0% center;
    }
    to {
        background-position: 200% center;
    }
}
.animated {
    animation: background-pan 2s linear infinite;
}
</style>
