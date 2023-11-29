<template>
    <div
        class="fixed gap-[4px] text-white font-bold text-[12px] left-[8px] bottom-[50%] translate-y-[50%] p-[8px] border-2 border-white/10 rounded-full hidden sm:flex flex-col"
    >
        <Tooltip
            position="right"
            v-for="(_color, index) in colors"
            :key="_color"
            :label="index"
        >
            <div
                class="h-[32px] w-[32px] flex items-center p-1 border-2 border-white/10 rounded-full"
                :style="{ background: _color }"
            ></div>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import { colors } from '~/unocss.config';

const keys = computed(() => Object.keys(colors));
</script>
