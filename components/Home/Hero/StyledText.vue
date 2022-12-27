<template>
    <span
        :class="[
            'bg-backgroundsecond lg:bg-transparent lg:hover:bg-backgroundsecond',
            'px-2 w-min rounded-[10px] lg:rounded-[12px]',
            'rotate-[1.87deg] lg:rotate-[0] hover:rotate-[1.87deg]',
            'group flex',
            'hover:scale-102 active:scale-99 cursor-none',
            'shadow-2xl shadow-transparent hover:shadow-shadow/20 transition-all duration-100',
        ]"
        ref="target"
    >
        <MainGradientText animated is="h1" class="-rotate-[1.87deg] lg:rotate-[0] !group-hover:-rotate-[1.87deg]">{{ name }}</MainGradientText>
    </span>
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});

const target = ref(null);
const translateX = ref(0);
const translateY = ref(0);
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
    useMouseInElement(target);

const MAX_TRANSLATE = 2 / 100;

const elementTransform = computed(() => {
    // console.log('Runs')
    if (isOutside.value) return `translateX(0px) translateY(0px)`;

    translateX.value = Number((elementX.value * MAX_TRANSLATE).toFixed(2)); // handles x-axis
    translateY.value = Number((elementY.value * MAX_TRANSLATE).toFixed(2)); // handles y-axis

    const transformation = `translateX(${translateX.value}px) translateY(${translateY.value}px)`;
    console.log(transformation);
    return transformation;
});
</script>

<style lang="scss">

</style>
