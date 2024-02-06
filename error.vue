<template>
    <div>
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
        <section class="infoSection py-[64px] flex items-center min-h-[420px] flex-grow">
            <article class="sada-container">
                <div class="infoContainer flex flex-col gap-[24px]">
                    <div class="infoContentContainer flex flex-col gap-[16px]">
                        <div
                            class="iDesign flex gap-[7px] text-[28px] leading-[120%] font-500"
                        >
                            <h2>Can't find</h2>
                            <h2 class="text-white">anything.</h2>
                        </div>
                        <p class="text-[23px] leading-[130%]">
                            This page was either removed, or it never existed at all. Are you sure the URL is correct?
                        </p>
                    </div>
                    <SadaButton
                        :as="NuxtLink"
                        to="/"
                        :leftSection="ButtonIcon"
                        radius="md"
                        class="me-auto"
                    >
                        Home
                    </SadaButton>
                </div>
            </article>
        </section>
    </div>
</template>

<script setup lang="tsx">
import { NuxtLink, Icon } from '#components';

const ButtonIcon = () => (
    <Icon name="lets-icons:return-light" size="20" class="text-text stroke-1 stroke-text -scale-x-[1]" />
);
</script>