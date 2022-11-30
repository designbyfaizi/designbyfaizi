<template>
    <Head>
        <Title>Design by Faizi</Title>
        <Meta name="description" content="My amazing site!" />
    </Head>
    <NuxtLayout name="main-layout">
        <h1 class="text-primary">Home Page</h1>
        <!-- <button
            class="border-0 outline-0 ring-2 ring-transparent p-2 rounded-lg bg-dark-500 text-white cursor-pointer hover:bg-dark-300"
            @click="$switchTheme"
        >
            Switch Theme
        </button> -->
    </NuxtLayout>
</template>

<script setup lang="ts">
const { $colorModes, $switchTheme } = useNuxtApp();
const colorMode = useColorMode();
</script>
