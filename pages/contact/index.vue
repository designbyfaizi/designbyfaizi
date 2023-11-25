<template>
    <header class="contactHeadingSection pt-[24px]">
        <article class="sada-container">
            <div class="contactHeadingContainer flex gap-[16px]">
                <h1 class="text-[16px] leading-[130%] font-500">Contact</h1>
            </div>
        </article>
    </header>
    <section class="infoSection py-[64px]">
        <article class="sada-container">
            <div class="infoContainer flex flex-col gap-[24px]">
                <div class="infoContentContainer flex flex-col gap-[16px]">
                    <div
                        class="iDesign flex gap-[7px] text-[28px] leading-[120%] font-500"
                    >
                        <h2>Say</h2>
                        <h2 class="text-white">hello.</h2>
                    </div>
                    <p class="text-[22px] leading-[120%]">
                        Looking to start a project and need that magical touch?
                        Reach out.
                    </p>
                </div>
                <div class="availableContainer flex items-center gap-[6px]">
                    <div
                        class="green-dot bg-teal-400 w-[10px] h-[10px] rounded-full"
                    ></div>
                    <p class="text-[14px]">Available for new opportunities</p>
                </div>
                <SadaButton
                    :leftSection="ButtonIcon"
                    radius="md"
                    class="me-auto"
                >
                    Book a call
                </SadaButton>
            </div>
        </article>
    </section>
</template>

<script setup lang="tsx">
import {Icon} from "#components"

definePageMeta({
    layout: "main-layout",
});

const ButtonIcon = () => <Icon name="solar:calendar-mark-linear" size="20" class="text-main" />;
</script>
