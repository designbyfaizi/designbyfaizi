<template>
    <NuxtLink
        to="/"
        class="product flex gap-[12px] p-[12px] rounded-[12px] hover:(bg-background-second) active:(scale-98) transition-all duration-200"
    >
        <NuxtImg
            :src="props.image"
            :alt="props.name"
            class="image w-[40px] h-[40px] aspect-square rounded-full"
        />
        <div class="h-min gap-[2px] overflow-hidden">
            <h1 class="name text-[16px] font-500 text-white leading-[130%]">
                {{ props.name }}
            </h1>
            <p
                class="desc text-[14px] leading-[130%] text-ellipsis whitespace-nowrap overflow-hidden"
            >
                {{ props.description }}
            </p>
        </div>
        <p class="text-[14px] leading-[130%] ms-auto">$69</p>
    </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
    image: string;
    name: string;
    description: string;
};

const props = defineProps<Props>();
</script>
