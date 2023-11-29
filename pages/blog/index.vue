<template>
    <div>
        <!-- <HomeHeroSection />
        <HomeAboutSection /> -->
        <div>
            <header class="blogsHeadingSection pt-[24px]">
                <article class="sada-container">
                    <div class="blogsHeadingContainer flex gap-[16px]">
                        <h1 class="text-[16px] leading-[130%] font-500">
                            Blog
                        </h1>
                    </div>
                </article>
            </header>
            <section class="infoSection py-[64px]">
                <article class="sada-container">
                    <div
                        class="iDesign flex gap-[7px] text-[28px] leading-[120%] font-500"
                    >
                        <h2>A few of my</h2>
                        <h2 class="text-white">words</h2>
                    </div>
                </article>
            </section>
        </div>
        <section class="blogSection py-[64px]">
            <article class="sada-container">
                <div class="blogContainer flex flex-col gap-[24px]">
                    <NuxtLink
                        :to="blog.url || '#'"
                        v-for="blog in blogs"
                        :key="blog.id"
                    >
                        <div
                            class="blog bg-neutral-900 flex flex-col gap-4 hover:(bg-neutral-800)"
                        >
                            <div
                                :style="`background-image: url(${blog.image})`"
                                class="aspect-[16/9] object-cover bg-neutral-800"
                            ></div>
                            <div class="blogContent p-[4px]">
                                <h3 class="text-xl">{{ blog.heading }}</h3>
                                <p class="text-lg">{{ blog.richText + "." }}</p>
                                <h6 class="text-neutral-500">
                                    {{ blog.author }}
                                </h6>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </article>
        </section>
    </div>
</template>

<script lang="ts" setup>
const { blogs } = useBlogs();
useHead({
    title: "Blogs by Faizi",
    meta: [{ name: "description", content: "Blog - Design by Faizi" }],
});

definePageMeta({
    layout: "main-layout",
});
</script>
