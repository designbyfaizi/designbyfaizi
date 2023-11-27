<template>
    <NuxtLink
        :to="to"
        :class="[
            'flex items-center justify-center gap-[8px]',
            'rounded-full w-[40px] h-[40px] aspect-square',
            'hover:bg-main/20 active:scale-98 transition-all duration-200',
            isActive && '!bg-primary !hover:bg-primary-light !shadow-primary/50 text-neutral-900',
        ]"
    >
        <Icon
            :name="icon"
            :size="size"
            :class="[
                'text-main w-[24px] aspect-square',
                isActive && '!text-background',
            ]"
        />
        <span v-if="label">{{ label }}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
import {Icon} from "#components";
const route = useRoute();

type Props = {
    icon: string;
    label?: string;
    size?: string;
    to?: string;
};
const props = withDefaults(defineProps<Props>(), {
    size: "48",
    to: "#",
});

const isActive = computed(() => {
    if(props?.to === "/"){
        return route?.path === props.to
    }
    return route?.path?.includes(props.to)
});
</script>
