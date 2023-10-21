<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <!-- Adding Key to Fix Strange Navigation Error During Fast Navigation -->
        <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
</template>

<style>
/* .page-enter-active,
.page-leave-active {
    transition: all 0.3s ease-in-out;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(0.5rem);
} */
</style>
