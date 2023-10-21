<template>
    <NuxtLink
        :to="to"
        :class="[
            'flex items-center justify-center bg-neutral-700/80 gap-[8px]',
            'rounded-full text-xl py-1 px-5 text-main',
            'hover:bg-neutral-700/60 active:scale-98',
            isActive && '!bg-primary !shadow-primary/50 text-neutral-900',
        ]"
    >
        <Icon
            v-if="icon"
            :name="icon"
            :size="size"
            :class="['text-main w-[32px] aspect-square', isActive && 'text-neutral-900']"
        />
        <span v-if="label">{{ label }}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
const route = useRoute();
// console.log({route:route.path})
const props = defineProps({
    label: {
        type: String,
        required: true,
        default: "Home",
    },
    icon: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        default: "48",
    },
    to: {
        type: String,
        default: "/",
    },
});

const isActive = computed(() => route?.path === props.to);
</script>
