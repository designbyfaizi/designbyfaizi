<template>
    <div
        v-bind="$attrs"
        :class="[
            'group transition-all duration-100',
            'aspect-square h-[36px] min-w-[36px] sm:h-[50px] sm:min-w-[50px]',
            'flex items-center justify-center gap-2 rounded-full',
            'bg-neutral-800 hover:bg-neutral-700/50 cursor-pointer active:scale-95',
        ]"
    >
        <Icon
            :key="name"
            :name="name"
            :class="[
                'h-[30px] w-[30px] sm:h-[32px] sm:w-[32px]',
                'text-neutral-500 group-hover:text-primary',
            ]"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        default: "line-md:moon-filled-loop",
    },
});

const hovered = useState("hovered", () => false);
</script>
