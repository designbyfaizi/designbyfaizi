<template>
    <HomeSection class="heroSection">
        <article class="heroContainer w-[clamp(260px,100%,1000px)]">
            <h1 class="flex items-center gap-2 font-ubuntu">
                Hello
                <Icon name="noto:waving-hand-medium-light-skin-tone" />
            </h1>
            <h1 class="font-ubuntu">My name is Faizan</h1>
            <div class="sm:flex gap-2 font-ubuntu items-center">
                <h1>I'm a Web</h1>
                <HomeHeroStyledText @click="$switchTheme" />
            </div>
            <p class="my-[20px]">
                Let me help you grow your business and make your website look
                pretty while at it.
            </p>
            <SadaButton @click="testModal.openModal" />
        </article>
    </HomeSection>
</template>

<script setup lang="ts">
const { $switchTheme } = useNuxtApp();
const testModal = useTestModal();
</script>

<style></style>
