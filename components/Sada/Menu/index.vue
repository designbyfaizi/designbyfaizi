<template>
    <div class="relative" ref="target">
        <slot>
            <SadaMenuTrigger
                :opened="opened"
                @open-dropdown="onOpen"
                @close-dropdown="onClose"
            ></SadaMenuTrigger>
        </slot>
        <SadaMenuDropdown :opened="opened" @close-dropdown="onClose">
        </SadaMenuDropdown>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    opened: {
        type: Boolean,
        default: false,
    },
});

const target = ref(null);
onClickOutside(target, () => {
    if (props.opened) {
        emit("change", false);
    }
});

const emit = defineEmits(["change"]);
const onOpen = () => {
    emit("change", true);
};
const onClose = () => {
    emit("change", false);
};
</script>
