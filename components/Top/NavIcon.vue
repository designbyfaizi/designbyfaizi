<template>
    <div
        v-bind="$attrs"
        :class="[
            'group transition-all duration-100',
            'aspect-square h-[36px] min-w-[36px] sm:h-[50px] sm:min-w-[50px]',
            'flex items-center justify-center gap-2 rounded-full',
            'bg-background hover:bg-backgroundsecond cursor-pointer active:scale-95',
            'shadow-transparent hover:shadow-shadow/20 shadow-lg'
        ]"
    >
        <Icon
            :key="name"
            :name="name"
            :class="[
                'h-[30px] w-[30px] sm:h-[40px] sm:w-[40px]',
                'text-neutral-600 group-hover:text-primary',
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
