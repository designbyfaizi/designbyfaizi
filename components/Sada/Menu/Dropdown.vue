<template>
    <!-- <Teleport to=".sada-menu"> -->
    <div
        v-show="props.opened"
        :class="[
            'sada-dropdown',
            'flex flex-col',
            'p-2 absolute',
            'min-w-[200px] lg:min-w-[300px] rounded-xl bg-backgroundsecond/50',
            'right-[-10px] top-[60px] sm:top-[90px]',
            'before:(backdrop-blur-md w-full h-full content-none absolute left-0 top-0 rounded-xl -z-1)',
        ]"
    >
        <slot>
            <SadaMenuDropdownItem name="Menu Item 1" />
            <SadaMenuDropdownItem name="Menu Item 2" />
            <SadaMenuDropdownItem name="Menu Item 3" />
            <SadaMenuDropdownItem name="Menu Item 4" />
            <SadaMenuDropdownItem name="Menu Item 5" />
        </slot>
    </div>
    <!-- </Teleport> -->
</template>

<script setup lang="ts">
const props = defineProps({
    opened: {
        type: Boolean,
        default: false,
    },
});
// const emit = defineEmits(["closeDropdown", "openDropdown"]);
</script>

<style lang="scss">
.sada-dropdown {
}
</style>
