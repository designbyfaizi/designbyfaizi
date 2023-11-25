<template>
    <span
        :class="[
            'bg-background-second lg:bg-transparent lg:hover:bg-background-second',
            'px-2 rounded-[10px] lg:rounded-[12px] w-fit',
            'rotate-[1.87deg] lg:rotate-[0] hover:rotate-[1.87deg]',
            'group flex',
            'hover:scale-102 active:scale-99',
            'shadow-2xl shadow-transparent hover:shadow-shadow/20 transition-all duration-100',
        ]"
    >
        <MainGradientText
            animated
            is="h1"
            class="-rotate-[1.87deg] lg:rotate-[0] !group-hover:-rotate-[1.87deg]"
        >
            {{ currentText }}
        </MainGradientText>
    </span>
</template>

<script setup lang="ts">
type Props = {
    text?: string | string[];
};
const props = withDefaults(defineProps<Props>(), {
    text: () => ["Developer", "Designer", "Enthusiast"],
});

const currentIndex = ref(0);

const currentText = computed(() => {
    if (Array.isArray(props.text)) {
        return props.text[currentIndex.value % props.text.length];
    } else {
        return props.text;
    }
});

const timerInterval = 2000; // 2 seconds

const updateText = () => {
    if (Array.isArray(props.text)) {
        currentIndex.value = (currentIndex.value + 1) % props.text.length;
    }
};

const timer = setInterval(updateText, timerInterval);

onMounted(() => {
    updateText();
});

onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>
