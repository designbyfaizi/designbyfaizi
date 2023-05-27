<template>
    <div
        :class="[
            'group',
            'flex items-center justify-center rounded-xl lg:rounded-[16px] bg-neutral-700/20',
            'hover:bg-backgroundsecond/70 active:scale-98 lg:hover:rounded-[15px]',
            'transition-all duration-100 cursor-pointer shadow shadow-shadow/80 shadow-2xl',
            isActive &&
                'scale-110 hover:scale-110 !bg-primary !shadow-primary/50',
        ]"
    >
        <NuxtLink
            :to="to"
            class="aspect-square w-[46px] h-[46px] lg:w-[100px] lg:h-[100px] grid place-items-center"
        >
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
