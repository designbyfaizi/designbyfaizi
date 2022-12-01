<template>
    <header
        :class="`bg-backgroundsecond/70 
      backdrop-blur-xl sticky top-[10px] container sm:mx-auto h-[70px] 
      sm:h-[100px] flex items-center justify-between rounded-2xl p-[20px] 
      transition-all duration-150 ring-2 ring-neutral-500/5 shadow-xl shadow-shadow/15`"
    >
        <TopSiteLogo />
        <div class="flex gap-4">
            <TopThemeIcon/>
            <div
                @click="dropdown = !dropdown"
                class="aspect-square h-[30px] w-[30px] sm:h-[50px] sm:w-[50px] ring-2 ring-neutral-600 rounded-full grid place-items-center group hover:ring-primary/10 cursor-pointer active:scale-95 transition-all duration-75"
            >
                <Icon
                    name="line-md:account"
                    class="aspect-square h-[26px] w-[26px] sm:h-[46px] sm:w-[46px] text-neutral-600 group-hover:text-background group-hover:bg-primary bg-background rounded-full m-0 p-0 transition-all duration-75"
                />
            </div>
        </div>
        <TopTestDropdown :dropdown="dropdown"/>
    </header>
</template>

<script setup lang="ts">
const { $isDarkMode } = useNuxtApp();
const dropdown = useState("dropdown", () => false);
</script>
