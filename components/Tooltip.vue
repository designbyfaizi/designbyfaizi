<template>
    <div class="relative">
        <p
            v-if="popupVisible"
            class="bg-background-second py-1 px-1.5 rounded-full absolute whitespace-nowrap -top-[34px] left-[50%] -translate-x-[50%] text-[12px] font-medium leading-[100%]"
        >
            {{ label }}
        </p>
        <div @mouseover="showPopup" @mouseleave="hidePopup">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
type Props = {
    label: string;
};
defineProps<Props>();

const popupVisible = ref(false);

const showPopup = () => (popupVisible.value = true);
const hidePopup = () => (popupVisible.value = false);
const togglePopup = () => (popupVisible.value = !popupVisible.value);
</script>
