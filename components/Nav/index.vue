<template>
    <nav :class="['fixed bottom-[10px]', 'left-[50%] -translate-x-[50%]']">
        <div
            :class="[
                'navContainer z-100',
                'bg-background-second/70 p-[8px] rounded-full',
                'flex gap-[8px] items-center justify-center',
                'ring-2 ring-background-light/30',
                `before:(content-[''] absolute w-full h-full left-0 top-0 backdrop-blur-xl -z-1 !rounded-full)`,
            ]"
        >
            <slot />
        </div>
    </nav>
</template>
