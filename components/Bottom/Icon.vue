<template>
    <div
        :class="[
            'group',
            'flex items-center justify-center rounded-[16px] bg-dark-100/10',
            'hover:bg-dark-100/20 active:scale-98 hover:rounded-[15px]',
            'transition-all duration-100 cursor-pointer shadow shadow-shadow/50 shadow-2xl',
            route?.path === to &&
                'scale-110 hover:scale-110 !bg-primary !shadow-primary/50',
        ]"
    >
        <NuxtLink :to="to" class="w-[100px] h-[100px] grid place-items-center">
            <Icon
                :name="name"
                :size="size"
                :class="[
                    'text-main group-hover:text-primary',
                    'transition-color duration-100',
                    route?.path === to && '!text-background',
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
        required: true,
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
</script>
