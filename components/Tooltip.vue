<template>
    <div class="relative">
        <Transition name="tooltip">
            <p
                v-if="_popupVisible && visible"
                :class="[
                    'bg-background-second py-[6px] px-[8px] rounded-full absolute whitespace-nowrap text-[12px] font-medium leading-[100%] z-100',
                    _positions[position],
                ]"
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
    label: string | number;
    visible?: boolean;
    position: "top" | "bottom" | "left" | "right";
};
withDefaults(defineProps<Props>(), {
    visible: true,
    position: "top",
});

const _positions = {
    top: "-top-[38px] left-[50%] -translate-x-[50%]",
    bottom: "-bottom-[38px] left-[50%] -translate-x-[50%]",
    left: "top-[50%] right-[48px] -translate-y-[50%] text-left",
    right: "top-[50%] left-[48px] -translate-y-[50%] text-left",
};

const _popupVisible = ref(false);

const showPopup = () => (_popupVisible.value = true);
const hidePopup = () => (_popupVisible.value = false);
const togglePopup = () => (_popupVisible.value = !_popupVisible.value);
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
