<template>
    <header
        class="bg-backgroundsecond/70 backdrop-blur-xl sticky top-[10px] container sm:mx-auto h-[70px] sm:h-[100px] flex items-center justify-between rounded-2xl p-[20px] transition-all duration-150 ring-2 ring-neutral-200/5 shadow-xl shadow-shadow/15"
    >
        <NuxtLink
            to="/"
            class="hover:scale-95 transition-transform duration-50 select-none"
        >
            <NuxtImg
                src="/img/designbyfaizi-logo.svg"
                class="w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] transition-all duration-150"
            />
        </NuxtLink>
        <div class="flex gap-4">
            <Icon
                v-if="$isDarkMode"
                @click="$switchTheme"
                :name="moonyIcon"
                class="aspect-square h-[32px] w-[32px] sm:h-[46px] sm:w-[46px] text-neutral-600 hover:text-primary active:scale-95 bg-background rounded-full m-0 p-2 cursor-pointer"
            />
            <Icon
                v-else
                @click="$switchTheme"
                :name="sunnyIcon"
                class="aspect-square h-[32px] w-[32px] sm:h-[46px] sm:w-[46px] text-neutral-600 hover:text-primary active:scale-95 bg-background rounded-full m-0 p-2 cursor-pointer"
            />
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
        <div
            v-if="dropdown"
            class="dropdown min-w-[200px] min-h-[100px] absolute bg-main top-[85px] right-[10px] rounded-lg p-4 flex flex-col"
        >
            <p class="text-background select-none">Test Dropdown</p>
            <p class="text-background select-none">Test Dropdown</p>
            <p class="text-background select-none">{{ dropdown }}</p>
        </div>
    </header>
</template>

<script setup lang="ts">
const { $switchTheme, $isDarkMode } = useNuxtApp();
const colorMode = useColorMode();
const sunnyIcon = "line-md:moon-filled-to-sunny-filled-loop-transition";
const moonyIcon = "line-md:moon-filled-loop";

const dropdown = useState("dropdown", () => false);
</script>
