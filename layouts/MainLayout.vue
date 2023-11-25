<template>
    <div
        ref="el"
        :class="[
            //'sada-container',
            //'transition-all duration-150',
        ]"
    >
        <!-- <SadaModal :is-open="testModal.isOpen">
            <p class="text-18px">This is a test Modal</p>

            <button
                class="p-4 bg-white/6 hover:bg-white/10 rounded-lg mt-2"
                @click="testModal.closeModal"
            >
                Close Modal
            </button>
        </SadaModal> -->
        <!-- <Header /> -->
        <main class="z-0 pb-[100px]">
            <slot />
        </main>
        <Nav>
            <NavIcon v-for="link in navLinks" :icon="link.icon" :to="link.to" />
            <div class="divider bg-background-light w-[1px] h-[24px]"></div>
            <NavIcon
                v-for="link in socialLinks"
                :icon="link.icon"
                :to="link.to"
            />
        </Nav>
    </div>
    <!-- <MainCircleCursor v-show="$largeScreen" /> -->
</template>

<style lang="scss"></style>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
const testModal = useTestModal();

const navLinks = [
    { name: "Home", to: "/", icon: "ph:house" },
    { name: "Projects", to: "/projects", icon: "ph:cursor-click" },
    { name: "Products", to: "/products", icon: "iconoir:shop-window" },
    { name: "Blog", to: "/blog", icon: "ph:pencil-simple-line" },
    { name: "Stack", to: "/stack", icon: "lucide:layers" },
    { name: "Contact", to: "/contact", icon: "carbon:send-alt" },
];

const socialLinks = [
    {
        name: "Github",
        to: "https://github.com/designbyfaizi",
        icon: "ph:house",
    },
    { name: "Twitter", to: "https://x.com/designbyfaizi", icon: "ph:house" },
    {
        name: "Instagram",
        to: "https://instagram.com/khak.csar",
        icon: "ph:house",
    },
];
</script>
