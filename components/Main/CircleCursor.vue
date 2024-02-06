<template>
  <div class="cursor" v-show="mouseIsInside">
    <div
      v-for="(circle, index) in totalCircles"
      class="circles"
      ref="circles"
      key="index"
    ></div>
  </div>
</template>

<script setup lang="ts">
const mouseIsInside = useState(() => false);
const totalCircles = 20;
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
  const cursor: CircleType = document.querySelector(".cursor") as CircleType;
  const circles: NodeListOf<CircleType> = document.querySelectorAll(".circles");

  circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
  });
  window.addEventListener("mouseover", (e) => {
    mouseIsInside.value = true;
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

      circle.style.scale = `${(totalCircles - index) * 2}%`;

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
.cursor {
  pointer-events: none;
  position: fixed;
  display: block;
  border-radius: 0;
  mix-blend-mode: difference;
  top: 0;
  left: 0;
  z-index: 200;
  .circles {
    background-color: white;
    height: v-bind(circleSize);
    width: v-bind(circleSize);
    border-radius: v-bind(circleSize);
    position: absolute;
    display: block;
  }
}
</style>
