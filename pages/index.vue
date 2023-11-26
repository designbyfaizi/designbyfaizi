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
        <SiteColors />
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
