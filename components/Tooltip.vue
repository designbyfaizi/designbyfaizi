<template>
    <div class="relative">
        <Transition name="tooltip">
            <p
                v-if="popupVisible"
                class="bg-background-second py-[6px] px-[8px] rounded-full absolute whitespace-nowrap -top-[38px] left-[50%] -translate-x-[50%] text-[12px] font-medium leading-[100%]"
            >
                {{ label }}
            </p>
        </Transition>
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

<style scoped>
.tooltip-enter-from,
.tooltip-leave-to {
    opacity: 0;
    margin-top: 4px;
}

.tooltip-enter-to,
.tooltip-leave-from {
    opacity: 1;
    margin-top: 0px;
}

.tooltip-enter-active,
.tooltip-leave-active {
    transition: all 0.1s;
}
</style>
