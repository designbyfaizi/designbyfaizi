<template>
    <div
        :class="[
            `fixed left-0 top-0 h-screen w-full bg-black/20 z-1000`,
            `flex flex-col items-center justify-center`,
        ]"
        v-if="isOpen"
        @close="onClose"
    >
        <div
            :class="[
                `backdrop`,
                `before:(content-[''] absolute w-full h-full left-0 top-0 backdrop-blur-xl -z-1)`,
            ]"
        />
        <div
            class="modal bg-neutral-800 text-light p-4 rounded-md max-w-screen-md"
        >
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
type Props = {
    isOpen?: boolean;
    onClose?: () => void | any;
};

const props = withDefaults(defineProps<Props>(), {
    isOpen: false,
    onClose: () => {},
});
</script>
