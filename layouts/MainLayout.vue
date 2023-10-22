<template>
    <div
        :class="[
            'container mx-[10px] sm:mx-auto',
            //'transition-all duration-150',
        ]"
    >
        <Header/>
        <main class="z-0 pb-[100px]">
            <slot />
        </main>
        <Nav>
            <NavIcon label="Home" to="/" />
            <NavIcon label="About" to="/about" />
            <NavIcon label="Blogs" to="/blogs" />
            <NavIcon label="Github" to="/github" />
        </Nav>
    </div>
    <!-- <MainCircleCursor v-show="$largeScreen" /> -->
</template>

<style lang="scss"></style>

<script setup lang="ts">
// const { $largeScreen } = useNuxtApp();
// console.log({ $largeScreen: $largeScreen.value });
// const bottomIconSize = computed(() => {
//     console.log({ $largeScreen: $largeScreen.value });
//     return $largeScreen ? "48" : "20";
// });
// watchEffect(() => {
//     console.log($largeScreen.value);
// });
</script>
