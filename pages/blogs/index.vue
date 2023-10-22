<template>
    <section
        class="mt-[300px] mb-[100px] flex flex-col justify-center items-center"
    >
        <article class="w-full">
            <h1 class="flex items-center gap-2">
                Blogs
                <Icon name="noto:waving-hand-medium-light-skin-tone" />
            </h1>
        </article>
    </section>
    <section class="">
        <div class="blogs flex gap-4">
            <NuxtLink
                :to="blog.url || '#'"
                v-for="blog in blogs"
                :key="blog.title"
            >
                <div
                    class="blog bg-neutral-900 flex flex-col gap-4 p-[12px] rounded-[16px] hover:(bg-neutral-800)"
                >
                    <div
                        :style="`background-image: url(${blog.image})`"
                        class="aspect-[16/9] object-cover bg-neutral-800 rounded-[8px]"
                    ></div>
                    <h3 class="text-xl">{{ blog.title }}</h3>
                    <p class="text-lg">{{ blog.content + "." }}</p>
                    <h6 class="text-neutral-500">{{ blog.author }}</h6>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>

<script lang="ts" setup>
const blogs = [
    {
        title: "First Blog",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo qui nostrum tenetur iure tempore magnam, rerum, vel quaerat asperiores eveniet voluptate ab blanditiis inventore fuga delectus voluptatum. Dolorem, iste ipsam.",
        author: "Faizan Ullah",
        image: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922133.jpg",
        url: "/blogs/blog1",
    },
    {
        title: "Second Blog",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo qui nostrum tenetur iure tempore magnam, rerum, vel quaerat asperiores eveniet voluptate ab blanditiis inventore fuga delectus voluptatum. Dolorem, iste ipsam.",
        author: "Faizan Ullah",
        image: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922146.jpg",
        url: "/blogs/blog2",
    },
    {
        title: "Third Blog",
        content:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo qui nostrum tenetur iure tempore magnam, rerum, vel quaerat asperiores eveniet voluptate ab blanditiis inventore fuga delectus voluptatum. Dolorem, iste ipsam.",
        author: "Faizan Ullah",
        image: "https://img.freepik.com/free-vector/gradient-grainy-texture_23-2148976749.jpg",
        url: "/blogs/blog3",
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
