<template>
    <div class="relative sada-menu select-none" ref="target">
        <SadaMenuTrigger
            :opened="opened"
            @open-dropdown="openDropdown"
            @close-dropdown="closeDropdown"
        >
            <slot></slot>
        </SadaMenuTrigger>
        <SadaMenuDropdown :opened="opened"> </SadaMenuDropdown>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["change"]);
const target = ref(null);
const props = defineProps({
    opened: {
        type: Boolean,
        default: false,
    },
});

const openDropdown = () => {
    console.log("Here UwU");
    emit("change", true);
};

const closeDropdown = () => {
    emit("change", false);
};

onClickOutside(target, () => {
    if (props.opened) {
        closeDropdown();
    }
});
</script>
