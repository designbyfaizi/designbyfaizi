export default defineNuxtPlugin((nuxtApp) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return {
    provide: {
      isLargeScreen
    }
  }
})