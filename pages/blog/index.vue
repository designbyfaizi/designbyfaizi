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
                        :key="blog.title"
                    >
                        <div
                            class="blog bg-neutral-900 flex flex-col gap-4 hover:(bg-neutral-800)"
                        >
                            <div
                                :style="`background-image: url(${blog.image})`"
                                class="aspect-[16/9] object-cover bg-neutral-800"
                            ></div>
                            <div class="blogContent p-[4px]">
                                <h3 class="text-xl">{{ blog.title }}</h3>
                                <p class="text-lg">{{ blog.content + "." }}</p>
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
const blogs = [
    {
        title: "First Blog",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo qui nostrum tenetur iure tempore magnam, rerum, vel quaerat asperiores eveniet voluptate ab blanditiis inventore fuga delectus voluptatum. Dolorem, iste ipsam.",
        author: "Faizan Ullah",
        image: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922133.jpg",
        url: "/blog/blog1",
    },
    {
        title: "Second Blog",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo qui nostrum tenetur iure tempore magnam, rerum, vel quaerat asperiores eveniet voluptate ab blanditiis inventore fuga delectus voluptatum. Dolorem, iste ipsam.",
        author: "Faizan Ullah",
        image: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922146.jpg",
        url: "/blog/blog2",
    },
    {
        title: "Third Blog",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo qui nostrum tenetur iure tempore magnam, rerum, vel quaerat asperiores eveniet voluptate ab blanditiis inventore fuga delectus voluptatum. Dolorem, iste ipsam.",
        author: "Faizan Ullah",
        image: "https://img.freepik.com/free-vector/gradient-grainy-texture_23-2148976749.jpg",
        url: "/blog/blog3",
    },
];
useHead({
    title: "Blogs by Faizi",
    meta: [{ name: "description", content: "Blogs - Design by Faizi" }],
});

definePageMeta({
    layout: "main-layout",
});
</script>
