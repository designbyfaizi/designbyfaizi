const largeScreen = () => useMediaQuery('(min-width: 1024px)')

export const useLargeScreen = () => {
  return useState('largeScreen', largeScreen)
}