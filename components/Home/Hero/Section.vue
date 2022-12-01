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
                <HomeHeroStyledText name="Developer" @click="$switchTheme" />
            </div>
            <p class="my-[20px]">
                Let me help you grow your business and make your website look
                pretty while at it.
            </p>
            <SadaButton @click="hello()" />
        </article>
    </section>
</template>

<script setup lang="ts">
const { $switchTheme } = useNuxtApp();
const hello = () => {
    alert("Hello Viewer");
};
</script>
