<template>
    <h1
        :class="[
            'hover:bg-backgroundsecond',
            'px-2 w-min',
            'rounded-[12px]',
            'rotate-[1.87deg]',
            'group',
            'hover:rotate-0',
            'flex',
            'transition-transform',
            'duration-100',
            'hover:scale-102 active:scale-99',
            'cursor-none',
            'shadow-2xl shadow-transparent hover:shadow-shadow/20 transition-all duration-100',
        ]"
    >
        <div
            :class="[
                'bg-gradient-to-r from-primary to-primary-darker bg-clip-text text-transparent',
                '-rotate-[1.87deg] group-hover:rotate-0',
                'inline transition-transform duration-100 select-none',
            ]"
        >
            {{ name }}
        </div>
    </h1>
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});
</script>
