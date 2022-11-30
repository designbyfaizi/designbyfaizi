<template>
    <div class="max-w-screen-xl mx-auto container">
        <header
            class="bg-backgroundsecond h-[100px] flex items-center rounded-2xl p-[10px] my-[10px]"
        >
            <NuxtLink to="/" class="hover:scale-95">
                <NuxtImg
                    src="/img/designbyfaizi-logo.svg"
                    width="70"
                    height="70"
                />
            </NuxtLink>
        </header>
        <main>
            <slot />
        </main>
        <nav>BottomNav</nav>
    </div>
</template>
