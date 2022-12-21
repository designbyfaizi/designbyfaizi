<template>
    <div class="container mx-[10px] sm:mx-auto transition-all duration-150">
        <TopHeader />
        <main class="z-0">
            <slot />
        </main>
        <BottomNav>
            <BottomIcon to="/" />
            <BottomIcon to="/about" name="material-symbols:info-rounded" />
            <BottomIcon to="/github" name="iconoir:github" />
        </BottomNav>
        <MainCircleCursor/>
    </div>
</template>

<style lang="scss"></style>
