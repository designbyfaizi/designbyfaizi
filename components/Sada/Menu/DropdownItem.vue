<template>
    <p :class="['p-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer', 'active:(scale-98) transition-transform duration-100']">
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
