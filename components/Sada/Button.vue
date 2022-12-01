<template>
    <button
        :class="[
            'sada-button',
            'bg-primary text-white rounded-xl border-none outline-none',
            'font-medium px-[50px] py-[15px] cursor-pointer',
            'hover:bg-primary-dark active:scale-96',
            'transition-transform duration-100'
        ]"
    >
        Say Hello
    </button>
</template>


<style lang="scss">
.sada-button::before{
    border: 1px solid aqua;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
}
</style>    