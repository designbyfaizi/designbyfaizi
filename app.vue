<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <div
      class="h-[40px] bg-primary text-white font-ubuntu flex gap-2 items-center justify-center p-2"
    >
      <h1>{{ "⚠️ This website is under construction" }}</h1>
      <h1>
        Contact me at
        <a class="p-2 rounded-lg hover:bg-white/20" href="mailto:faizanullah1999@gmail.com">faizanullah1999@gmail.com</a>
      </h1>
    </div>
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
