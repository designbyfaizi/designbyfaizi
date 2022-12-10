<template>
    <div
        :class="[
            opened ? 'flex flex-col' : 'hidden',
            'p-2 absolute',
            'min-w-[400px] rounded-xl bg-black',
            'right-[8px] top-[90px]',
        ]"
    >
        <p class="p-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer">
            Menu Item 1
        </p>
        <p class="p-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer">
            Menu Item 2
        </p>
        <p class="p-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer">
            Menu Item 3
        </p>
        <p class="p-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer">
            Menu Item 4
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeDropdown", "openDropdown"]);
</script>
