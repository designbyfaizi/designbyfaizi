<template>
    <div class="circleContainer">
        <div
            v-for="(circle, index) in totalCircles"
            class="circles"
            ref="circles"
            key="index"
        ></div>
    </div>
</template>

<script setup lang="ts">
const totalCircles = 10;
const circleSize = useState(() => "24px");
const circleRadius = computed(() => {
    return Number(circleSize.value.split("px")[0]) / 2;
});
let coordinates = { x: 0, y: 0 };

interface CircleType extends HTMLElement {
    x: number;
    y: number;
}

onMounted(() => {
    const circles: NodeListOf<CircleType> =
        document.querySelectorAll(".circles");

    circles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });
    window.addEventListener("mousemove", (e: MouseEvent) => {
        coordinates.x = e.clientX;
        coordinates.y = e.clientY;
    });
    const animateCursor = () => {
        let x = coordinates.x;
        let y = coordinates.y;

        circles.forEach((circle, index) => {
            circle.style.left = `${x - circleRadius.value}px`;
            circle.style.top = `${y - circleRadius.value}px`;

            circle.style.scale = `${(totalCircles - index) * totalCircles}%`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
});
</script>
<style lang="scss" scoped>
.circleContainer {
    position: relative;
    background-color: blue;
    .circles {
        background-color: rgb(var(--primary));
        height: v-bind(circleSize);
        width: v-bind(circleSize);
        border-radius: 24px;
        position: fixed;
        display: block;
        transform-origin: center center;
        top: 0;
        left: 0;
        z-index: 200;
        pointer-events: none;
    }
}
</style>
