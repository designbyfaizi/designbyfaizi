<template>
     <div>
        <header class="productsHeadingSection pt-[24px]">
            <article class="sada-container">
                <div class="productsHeadingContainer flex gap-[16px]">
                    <h1 class="text-[16px] leading-[130%] font-500">
                        Products
                    </h1>
                </div>
            </article>
        </header>
        <section class="infoSection py-[64px]">
            <article class="sada-container">
                <div
                    class="iDesign flex gap-[7px] text-[28px] leading-[120%] font-500"
                >
                    <h2>Things I've</h2>
                    <h2 class="text-white">made</h2>
                </div>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "main-layout",
});
</script>