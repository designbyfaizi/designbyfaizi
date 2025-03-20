<template>
  <div
    class="card min-h-[200px] min-w-[200px] border-foreground/10 border-2 border-dashed rounded-lg before:rounded-lg"
  >
    <div class="card-content p-4">
      <h3 class="card-title text-2xl leading-[40px] mb-10">I know exactly what I'm doing</h3>
      <h4 ref="_subtitle" class="card-subtitle flex gap-x-1 flex-wrap"></h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
const subtitleText = "But in a much more real sense, I have no idea what I'm doing.";
const _subtitle = ref<HTMLElement | null>(null);

onMounted(() => {
  const createWord = (text: string, index: number) => {
    const word = document.createElement("span");
    word.innerHTML = `${text} `;
    word.classList.add("card-subtitle-word");
    word.style.transitionDelay = `${index * 40}ms`;
    return word;
  };

  const addWord = (text: string, index: number) => {
    return _subtitle.value?.appendChild(createWord(text, index));
  };

  const createSubtitle = (text: string) => text.split(" ").map(addWord);

  createSubtitle(subtitleText);
});
</script>

<style>
.card {
  --g1: rgb(98, 0, 234);
  --g2: rgb(236, 64, 122);
  --g3: rgb(253, 216, 53);
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

.card:while-hover:before {
  background-position: 100% 100%;
  transform: scale(1.04, 1.04);
}

.card-content {
  background: radial-gradient(rgb(255, 255, 255, 0.2) 8%, transparent 8%);
  background-position: 0% 0%;
  background-size: 3vmin 3vmin;
  width: 100%;
  transition: background-position 350ms ease;
  height: 100%;
  position: relative;
  z-index: 2;
}

.card:while-hover > .card-content {
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

.card:while-hover > .card-content > .card-subtitle > .card-subtitle-word {
  opacity: 1;
  transform: translateY(0%) !important;
  transition: opcity, 0ms, transform 200ms cubic-bezier(0.9, 0.06, 0.15, 0.9);
}
</style>
