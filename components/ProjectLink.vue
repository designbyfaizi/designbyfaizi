<template>
    <NuxtLink
        :to="project.to"
        class="socialLink flex items-center gap-[16px] group hover:(text-white) transition-all duration-200"
    >
        <div class="nameContainer w-auto flex flex-shrink-0 transform-none max-w-[80%] relative whitespace-pre-wrap break-normal">
            <h1
                class="font-500 text-[16px] whitespace-nowrap text-ellipsis overflow-hidden"
            >
                {{ project.name }}
            </h1>
        </div>
        <div class="animatedLineContainer w-full h-[1px] bg-background-second">
            <div
                class="animatedLine h-[1px] w-[0px] group-hover:w-full bg-white/25 transition-all duration-200"
            ></div>
        </div>
        <p class="text-[14px] capitalize">{{ project.niche }}</p>
        <p class="text-[14px]">{{ project.year }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
    project: Project;
};
defineProps<Props>();
</script>
