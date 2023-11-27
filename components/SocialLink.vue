<template>
    <NuxtLink
        :to="to"
        class="socialLink flex items-center gap-[16px] group hover:(text-white) transition-all duration-200"
    >
        <h1 class="font-500 text-[16px]">{{ name }}</h1>
        <div class="animatedLineContainer w-full h-[1px] bg-background-second">
            <div
                class="animatedLine h-[1px] w-[0px] group-hover:w-full bg-white/25 transition-all duration-200"
            ></div>
        </div>
        <p class="text-[14px]">Follow</p>
    </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
    name: string;
    to: string;
};
defineProps<Props>();
</script>
