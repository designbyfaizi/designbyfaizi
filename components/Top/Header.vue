<template>
    <header class="flex justify-center relative mx-[10px] sm:mx-auto z-100">
        <div
            :class="`headerContainer bg-backgroundsecond/50 
      backdrop-blur-md fixed top-[10px] container h-[70px] 
      sm:h-[100px] flex items-center justify-between rounded-2xl p-[20px] 
      transition-all duration-150 ring-2 ring-neutral-500/10 shadow-xl shadow-shadow/15`"
        >
            <TopSiteLogo />
            <div class="flex gap-4 items-center">
                <TopNavIcon
                    @click="$switchTheme"
                    :name="$isDarkMode ? moonyIcon : sunnyIcon"
                />
                <TopNavIcon :name="'line-md:account'" class="" />
            </div>
            <SadaMenu :opened="opened" @change="onChange">
                <SadaMenuTrigger
                    :opened="opened"
                    @open-dropdown="onChange(true)"
                    @close-dropdown="onChange(false)"
                >
                    <SadaButton>Treeger</SadaButton>
                </SadaMenuTrigger>
            </SadaMenu>

            <!-- <TopTestDropdown :dropdown="dropdown" /> -->
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
const sunnyIcon = "line-md:moon-filled-to-sunny-filled-loop-transition";
const moonyIcon = "line-md:moon-filled-loop";
</script>

<style lang="scss">
.headerContainer {
    width: calc(100% - 20px);
}
</style>
