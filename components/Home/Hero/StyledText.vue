<template>
    <span
        :class="[
            'bg-backgroundsecond lg:bg-transparent lg:hover:bg-backgroundsecond',
            'px-2 w-min rounded-[10px] lg:rounded-[12px]',
            'rotate-[1.87deg] lg:rotate-[0] hover:rotate-[1.87deg]',
            'group flex',
            'hover:scale-102 active:scale-99',
            'shadow-2xl shadow-transparent hover:shadow-shadow/20 transition-all duration-100',
        ]"
        ref="target"
    >
        <MainGradientText animated is="h1" class="-rotate-[1.87deg] lg:rotate-[0] !group-hover:-rotate-[1.87deg]">{{ name }}</MainGradientText>
    </span>
</template>

<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true,
    },
});

const target = ref(null);
</script>

<style lang="scss">

</style>
