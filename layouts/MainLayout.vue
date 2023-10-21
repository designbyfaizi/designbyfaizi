<template>
    <div
        :class="[
            'container mx-[10px] sm:mx-auto',
            //'transition-all duration-150',
        ]"
    >
        <TopHeader />
        <main class="z-0">
            <slot />
        </main>
        <Nav>
            <NavIcon :size="bottomIconSize" to="/" />
            <NavIcon
                :size="bottomIconSize"
                to="/about"
                name="material-symbols:info-rounded"
            />
            <NavIcon
                :size="bottomIconSize"
                to="/github"
                name="iconoir:github"
            />
        </Nav>
    </div>
    <!-- <MainCircleCursor v-show="$largeScreen" /> -->
</template>

<style lang="scss"></style>

<script setup lang="ts">
// const largeScreen = useLargeScreen();
const { $largeScreen } = useNuxtApp();
console.log({ $largeScreen: $largeScreen.value });
const bottomIconSize = computed(() => {
    console.log({ $largeScreen: $largeScreen.value });
    return $largeScreen ? "48" : "20";
});
watchEffect(() => {
    console.log($largeScreen.value);
});
</script>
