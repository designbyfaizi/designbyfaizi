<template>
    <div @click="onClick" class="">
        <slot>
            <!-- Default Trigger -->
            <SadaButton>Default Trigger</SadaButton>
        </slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    opened: {
        type: Boolean,
    },
});
const emit = defineEmits(["closeDropdown", "openDropdown"]);

const onClick = () => {
    if (!props.opened) {
        emit("openDropdown");
    }
    else{
      emit("closeDropdown")
    }
};
</script>
