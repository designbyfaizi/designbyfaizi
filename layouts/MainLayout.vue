<template>
    <div class="container mx-[10px] sm:mx-auto transition-all duration-150">
        <TopHeader />
        <main class="z-0">
            <slot />
        </main>
        <BottomNav>
            <BottomIcon :size="bottomIconSize" to="/" />
            <BottomIcon :size="bottomIconSize" to="/about" name="material-symbols:info-rounded" />
            <BottomIcon :size="bottomIconSize" to="/github" name="iconoir:github" />
        </BottomNav>
        <MainCircleCursor v-show="largeScreen"/>
    </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
    const largeScreen = useLargeScreen();
    const bottomIconSize = computed(() => {
        return largeScreen.value ? '48' :'20';
    })
</script>
