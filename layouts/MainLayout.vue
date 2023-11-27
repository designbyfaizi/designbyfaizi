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
import { useNav } from "~/stores/useNav";
const el = ref<HTMLElement | null>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
const testModal = useTestModal();
const { navLinks, socialLinks } = useNav();
</script>
