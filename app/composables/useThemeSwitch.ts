import { useColorMode } from "@vueuse/core";

export type ThemeName = "light" | "dark";

export const themes: { name: ThemeName; icon: string }[] = [
  { name: "light", icon: "mdi:white-balance-sunny" },
  { name: "dark", icon: "mdi:moon-waning-crescent" },
];

// Switching theme grows the new colours out of the button in a circle.
export const useThemeSwitch = () => {
  const { store, system } = useColorMode({ disableTransition: false });
  const current = computed<ThemeName>(() =>
    store.value === "auto" ? system.value : (store.value as ThemeName),
  );

  const setTheme = (next: ThemeName, event?: MouseEvent) => {
    const motionOff = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || motionOff) {
      store.value = next;
      return;
    }

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(async () => {
      store.value = next;
      await nextTick();
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const toggleTheme = (event?: MouseEvent) =>
    setTheme(current.value === "dark" ? "light" : "dark", event);

  return { current, setTheme, toggleTheme };
};
