<template>
    <NuxtLink
        ref="myHoverableElement"
        to="/"
        :class="[
            'select-none flex items-center gap-[12px] font-tanker text-primary rounded-[4px] hover:(bg-neutral-800 transition-background duration-300)',
        ]"
    >
        <Transition name="logo">
            <NuxtImg
                v-if="!isHovered"
                src="/img/designbyfaizi-logo.svg"
                class="w-[40px] h-[40px] sm:w-[56px] sm:h-[56px]"
            />
        </Transition>
        <Transition name="label">
            <h1 v-if="isHovered" class="text-[32px] uppercase py-1 px-2 font-400">
                Design by Faizi
            </h1>
        </Transition>
    </NuxtLink>
</template>

<script setup lang="ts">
const myHoverableElement = ref();
const isHovered = useElementHover(myHoverableElement);
</script>

<style>
.logo-enter-from,
.logo-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.logo-enter-to,
.logo-leave-from {
    opacity: 100;
    transform: translateY(0px);
}

.logo-leave-from {
    position: absolute;
}

.logo-enter-active {
    transition: transform 0.3s;
}

.label-enter-from,
.label-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.label-enter-to,
.label-leave-from {
    opacity: 100;
    transform: translateY(0px);
}

.label-leave-from {
    position: absolute;
}

.label-enter-active {
    transition: transform 0.3s;
}
</style>
