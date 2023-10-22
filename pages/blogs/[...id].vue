<template>
    <section
        class="mt-[300px] mb-[100px] flex flex-col justify-center items-center"
    >
        <article class="w-full">
            <!-- {{ $route.params.id[0] }} -->
            <ContentDoc />
        </article>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "main-layout",
});
</script>
