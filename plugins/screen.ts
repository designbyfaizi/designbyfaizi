export default defineNuxtPlugin((nuxtApp) => {
  const largeScreen = useState('largeScreen', () => useMediaQuery('(min-width: 1024px)'));

  return {
    provide: {
      largeScreen
    }
  }
})