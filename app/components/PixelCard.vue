<template>
  <component
    :is="as"
    class="card min-h-[100px] min-w-[200px] border-foreground/10 border-2 border-dashed rounded-lg before:rounded-lg hover:text-neutral-100 transition-colors duration-200"
  >
    <div class="card-content">
      <slot></slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
type Props = {
  as?: any;
};
const props = withDefaults(defineProps<Props>(), {
  as: "div",
});
const _subtitle = ref<HTMLElement | null>(null);
</script>

<style>
.card {
  --g1: hsl(var(--primary));
  --g2: hsl(var(--primary));
  --g3: hsl(var(--primary));
}
.card {
  cursor: pointer;
  position: relative;
}

.card:before {
  background: linear-gradient(
    130deg,
    transparent 0% 33%,
    var(--g1) 66%,
    var(--g2) 83.5%,
    var(--g3) 100%
  );
  background-size: 300% 300%;
  background-position: 0% 0%;
  content: "";
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  transition: background-position 350ms ease, transform 350ms ease;
  width: 100%;
  z-index: 1;
}

.card:hover:before {
  background-position: 100% 100%;
  transform: scale(1.04, 1.04);
}

.card-content {
  background: radial-gradient(hsla(var(--primary), 0.2) 8%, transparent 8%);
  background-position: 0% 0%;
  background-size: 3vmin 3vmin;
  width: 100%;
  transition: background-position 350ms ease;
  height: 100%;
  position: relative;
  z-index: 2;
}

.card:hover > .card-content {
  background-position: -10% 0;
}

.card-title,
.card-subtitle {
  color: var(--foreground);
}

.card-subtitle {
  font-size: 20px;
}

.card-subtitle-word {
  opacity: 0;
  display: inline-block;
  position: relative;
  transform: translateY(40%) !important;
  transition: none;
}

.card:hover > .card-content > .card-subtitle > .card-subtitle-word {
  opacity: 1;
  transform: translateY(0%) !important;
  transition: opcity, 0ms, transform 200ms cubic-bezier(0.9, 0.06, 0.15, 0.9);
}
</style>
