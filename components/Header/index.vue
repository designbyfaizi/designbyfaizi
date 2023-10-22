<template>
    <header class="flex justify-center relative mx-[10px] sm:mx-auto z-100">
        <div
            :class="[
                'headerContainer bg-neutral-900/70',
                'fixed top-[10px] container h-[64px] sm:h-[80px]',
                'flex items-center justify-between z-1',
                'rounded-[16px] p-[20px] transition-all duration-150',
                'ring-2 ring-neutral-900',
                `before:(backdrop-blur-xl w-full h-full content-[''] absolute left-0 top-0 rounded-2xl -z-1)`,
            ]"
        >
            <TopSiteLogo />
            <div class="flex gap-4 items-center">
                <TopNavIcon
                    @click="$switchTheme"
                    :name="$isDarkMode ? moonyIcon : sunnyIcon"
                />
                <SadaMenu :opened="opened" @change="onChange">
                    <SadaMenuTrigger>
                        <TopNavIcon name="ph:user-light" class="" />
                    </SadaMenuTrigger>
                </SadaMenu>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const { $switchTheme, $isDarkMode } = useNuxtApp();
const opened = useState((): boolean => false);
const onChange = (updatedStatus: boolean) => {
    // console.log({updatedStatus})
    opened.value = updatedStatus;
};

const print = (whatever: any) => {
    console.log(whatever);
};
const sunnyIcon = "ph:sun-fill";
const moonyIcon = "ph:moon-stars-light";
</script>

<style lang="scss">
.headerContainer {
    width: calc(100% - 20px);
    // &:before{
    //     content: Hello;
    //     height: 100vh;
    //     background: red;
    // }
}
</style>
