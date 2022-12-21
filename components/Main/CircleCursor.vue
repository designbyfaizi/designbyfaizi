<template>
    <div
        v-for="(circle, index) in 10"
        class="cirlce"
        ref="circles"
        key="index"
    ></div>
</template>

<script setup lang="ts">
const circleSize = ref("24px");
const circleScale = ref(1);
const circleRadius = computed(() => {
    return Number(circleSize.value.split("px")[0]) / 2;
});
const circles = ref([]);
const { x, y } = useMouse();

interface CircleType extends HTMLElement {
    x: number;
    y: number;
}

onMounted(() => {
    const animateCircles = () => {
        let xShift = x.value;
        let yShift = y.value;
        circles.value.forEach((circle: CircleType, index: number) => {
            circle.style.left = xShift - circleRadius.value + "px";
            circle.style.top = yShift - circleRadius.value + "px";
            circle.style.scale = "2"
            circle.x = xShift;
            circle.y = yShift;
            const nextCircle: CircleType =
                circles.value[index + 1] || circles.value[0];

            xShift += (nextCircle.x - xShift) * 0.2;
            yShift += (nextCircle.y - yShift) * 0.2;
        });
    };
    circles.value.forEach((circle: CircleType) => {
        circle.x = 0;
        circle.y = 0;
    });
    watch([x, y], () => {
        animateCircles();
    });
});
</script>
<style lang="scss">
.cirlce {
    height: v-bind(circleSize);
    width: v-bind(circleSize);
    border-radius: 24px;
    background-color: rgb(var(--primary));
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    pointer-events: none;
}
</style>
