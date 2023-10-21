<template>
    <nav :class="['fixed bottom-[10px]', 'left-[50%] -translate-x-[50%]']">
        <div
            :class="[
                'navContainer z-100',
                'bg-backgroundsecond/50 p-[8px] rounded-[16px]',
                'flex gap-[8px] items-center justify-center',
                'ring-2 ring-neutral-500/10',
                'shadow-xl shadow-shadow/15',
                `before:(content-[''] absolute w-full h-full left-0 top-0 backdrop-blur-lg -z-1 rounded-[16px])`,
            ]"
        >
            <slot />
        </div>
    </nav>
</template>
