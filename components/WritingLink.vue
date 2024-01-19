<template>
    <NuxtLink
        :to="blog.url"
        class="socialLink flex items-center gap-[16px] group hover:(text-white) transition-all duration-200"
    >
        <div
            class="nameContainer w-auto flex flex-shrink-0 transform-none max-w-[80%] relative whitespace-pre-wrap break-normal"
        >
            <h1
                class="font-500 text-[16px] whitespace-nowrap text-ellipsis overflow-hidden"
            >
                {{ blog.heading }}
            </h1>
        </div>
        <div class="animatedLineContainer w-full h-[1px] bg-background-second">
            <div
                class="animatedLine h-[1px] w-[0px] group-hover:w-full bg-white/25 transition-all duration-200"
            ></div>
        </div>
        <p class="text-[14px] whitespace-nowrap">{{ _date }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
    blog: Blog;
};
const props = defineProps<Props>();

const _date = computed(() => {
    const _day = props.blog.date.getDate();
    const _month = props.blog.date.getMonth();
    const _year = props.blog.date.getFullYear();

    return `${_day}/${_month+1}/${_year}`;
});
</script>
