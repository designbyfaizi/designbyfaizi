<template>
    <nav class="flex justify-center">
        <div
            :class="[
                'navContainer',
                'z-100',
                'bg-backgroundsecond/50 p-[14px] rounded-[26px]',
                'fixed bottom-[10px]',
                'min-h-[64px] sm:min-h-[128px]',
                'flex gap-4 items-center justify-center',
                'ring-2 ring-neutral-500/10',
                'shadow-xl shadow-shadow/15',
                'before:(backdrop-blur-md w-full h-full content-none absolute left-0 top-0 rounded-[26px] -z-1)',
            ]"
        >
            <slot />
        </div>
    </nav>
</template>

<script setup lang="ts">
</script>
