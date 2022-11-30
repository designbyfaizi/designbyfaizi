<template>
    <div class="container mx-[10px] sm:mx-auto">
        <TopHeader />
        <main class="select-none">
            <slot />
        </main>
        <nav class="select-none">BottomNav</nav>
    </div>
</template>
