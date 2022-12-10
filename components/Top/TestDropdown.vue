<template>
    <div
        ref="target"
        v-if="dropdown"
        class="dropdown min-w-[200px] min-h-[100px] absolute bg-main top-[85px] right-[10px] rounded-lg p-4 flex flex-col"
    >
        <p class="text-background select-none">Test Dropdown</p>
        <p class="text-background select-none">Test Dropdown</p>
        <p class="text-background select-none">{{ dropdown }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    dropdown: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const target=ref(null);

onClickOutside(target, (event: Event) => {
    // closeDropdown()
})

</script>
