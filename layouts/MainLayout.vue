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
            <Tooltip
                :label="link.name"
                v-for="link in navLinks"
                :key="link.name"
            >
                <NavIcon :icon="link.icon" :to="link.to" />
            </Tooltip>
            <div
                class="divider hidden sm:block bg-main/50 w-[1px] h-[24px]"
            ></div>
            <Tooltip
                :label="link.name"
                v-for="link in socialLinks"
                :key="link.name"
            >
                <NavIcon
                    :icon="link.icon"
                    :to="link.to"
                    target="_blank"
                    class="!hidden !sm:flex"
                />
            </Tooltip>
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
        icon: "mdi:github-face",
    },
    {
        name: "Twitter",
        to: "https://x.com/designbyfaizi",
        icon: "ri:twitter-x-line",
    },
    {
        name: "Instagram",
        to: "https://instagram.com/khak.csar",
        icon: "mdi:instagram",
    },
];
</script>
