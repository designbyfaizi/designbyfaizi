<template>
    <div class="container mx-[10px] sm:mx-auto transition-all duration-150">
        <TopHeader />
        <main class="select-none">
            <slot />
        </main>
        <nav class="select-none">BottomNav</nav>
    </div>
</template>

<style lang="scss">

</style>
