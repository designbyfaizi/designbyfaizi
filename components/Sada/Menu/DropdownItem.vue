<template>
    <p class="p-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer">
        {{ props.name }}
    </p>
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        default: "Menu Item",
    },
});
</script>
