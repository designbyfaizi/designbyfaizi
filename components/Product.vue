<template>
    <NuxtLink
        :to="product.to"
        class="product flex gap-[12px] p-[12px] rounded-[12px] group hover:(bg-background-second) active:(scale-98) transition-all duration-200"
    >
        <NuxtImg
            :src="product.logo"
            :alt="product.name"
            class="image w-[40px] h-[40px] aspect-square rounded-full"
        />
        <div class="h-min gap-[2px] overflow-hidden">
            <h1 class="name text-[16px] font-500 text-white leading-[130%]">
                {{ product.name }}
            </h1>
            <p
                class="desc text-[14px] leading-[130%] text-ellipsis whitespace-nowrap overflow-hidden"
            >
                {{ product.description }}
            </p>
        </div>
        <p class="text-[14px] leading-[130%] ms-auto opacity-0 group-hover:opacity-100 transition-all duration-200">{{ product.price }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
    product: Product;
};
defineProps<Props>();
</script>
