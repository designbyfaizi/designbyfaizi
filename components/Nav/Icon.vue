<template>
    <div
        :class="[
            'group w-[64px] aspect-square rounded-[8px]',
            'flex items-center justify-center bg-neutral-700/20',
            'hover:bg-neutral-700/40 active:scale-98',
            'transition-all duration-100 cursor-pointer shadow shadow-shadow/80 shadow-2xl',
            isActive && '!bg-primary !shadow-primary/50',
        ]"
    >
        <NuxtLink :to="to" class="aspect-square grid place-items-center">
            <Icon
                :name="name"
                :size="size"
                :class="[
                    'text-main group-hover:text-primary',
                    'transition-color duration-100',
                    isActive && '!text-background',
                ]"
            />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
// console.log({route:route.path})
const props = defineProps({
    name: {
        type: String,
        required: false,
        default: "iconoir:home-simple-door",
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
