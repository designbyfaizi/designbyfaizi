<template>
    <div>
        <!-- <HomeHeroSection />
        <HomeAboutSection /> -->
        <header class="profileSection pt-[24px]">
            <article class="sada-container">
                <div class="profileContainer flex gap-[16px]">
                    <NuxtImg
                        src="/img/designbyfaizi-logo.svg"
                        class="w-[44px] h-[44px] rounded-full"
                    />
                    <div class="profileContent flex flex-col">
                        <h1
                            class="text-white text-[16px] leading-[130%] font-500"
                        >
                            Faizan Ullah
                        </h1>
                        <p class="text-[16px] leading-[130%] font-400">
                            B. 1999
                        </p>
                    </div>
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
                            <h2>I design</h2>
                            <h2 class="text-white">apps</h2>
                        </div>
                        <p class="text-[22px] leading-[120%]">
                            I'm Faizan Ullah, a passionate creator living in
                            Rawalpindi, Pakistan. My work spans across multiple
                            disciplines from product design, to web design,
                            branding and art.
                        </p>
                    </div>
                    <div class="availableContainer flex items-center gap-[6px]">
                        <div
                            class="green-dot bg-teal-400 w-[10px] h-[10px] rounded-full"
                        ></div>
                        <p class="text-[14px]">
                            Available for new opportunities
                        </p>
                    </div>
                    <SadaButton
                        :as="NuxtLink"
                        to="/contact"
                        :leftSection="ButtonIcon"
                        radius="md"
                        class="me-auto"
                    >
                        Contact me
                    </SadaButton>
                </div>
            </article>
        </section>
        <div
            class="fixed grid grid-cols-12 gap-[8px] text-white font-bold text-[12px] left-[8px] bottom-[8px] max-w-[240px] p-[8px] border-2 border-white/10 rounded-xl"
        >
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-main"
            >
                Main (Text)
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-primary"
            >
                Primary
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-primary-light"
            >
                Primary Light
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-primary-lighter"
            >
                Primary Lighter
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-primary-dark"
            >
                Primary Dark
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-primary-darker"
            >
                Primary Darker
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-background"
            >
                Background
            </div>
            <div
                class="col-span-6 min-h-[80px] border-2 border-white/10 px-8 text-center rounded-lg flex items-center justify-center bg-background-second"
            >
                Background Second
            </div>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { NuxtLink, Icon } from "#components";
useHead({
    title: "Design by Faizi",
    meta: [{ name: "description", content: "My Amazing Site!" }],
    bodyAttrs: {
        class: "test",
    },
    script: [{ innerHTML: "console.log('Hello Homepage')" }],
});

definePageMeta({
    layout: "main-layout",
});

useSeoMeta({
    title: "Design by Faizi",
    ogTitle: "Design by Faizi",
    description: `This is Faizan's amazing site`,
    ogDescription: `This is Faizan's amazing site`,
    ogImage: "https://fireship.io/courses/nextjs/img/featured.webp",
    twitterCard: "summary_large_image",
});

const ButtonIcon = () => (
    <Icon name="fluent:mail-32-regular" size="20" class="text-main" />
);
</script>
