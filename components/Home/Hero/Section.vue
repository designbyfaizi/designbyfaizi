<template>
    <section
        class="heroSection h-screen flex flex-col justify-center items-center"
    >
        <article
            class="heroContainer w-full max-w-screen-md lg:max-w-[1000px] cursor-default"
        >
            <h1 class="flex items-center gap-2">
                Hello
                <Icon name="noto:waving-hand-medium-light-skin-tone" />
            </h1>
            <h1>My name is Faizan</h1>
            <div class="sm:flex gap-2 items-center">
                <h1>I'm a Web</h1>
                <HomeHeroStyledText
                    ref="target"
                    name="Developer"
                    @click="$switchTheme"
                />
            </div>
            <p class="my-[20px]">
                Let me help you grow your business and make your website look
                pretty while at it.
            </p>
            <SadaButton @click="" />
        </article>
    </section>
</template>

<script setup lang="ts">
const { $switchTheme } = useNuxtApp();

const target = ref(null);
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
    useMouseInElement(target);

const MAX_ROTATION = 20;

// const navTransform = computed(() => {
//     // const translationX = (
//     //     MAX_ROTATION / 2 -
//     //     (elementY.value / elementHeight.value) * MAX_ROTATION
//     // ).toFixed(2); // handles x-axis
//     // const translationY = (
//     //     (elementX.value / elementWidth.value) * MAX_ROTATION -
//     //     MAX_ROTATION / 2
//     // ).toFixed(2); // handles y-axis

//     return isOutside.value
//         ? ""
//         : `translateX(${translationX}deg) translateY(${translationY}deg)`;
// });
</script>

<style></style>
