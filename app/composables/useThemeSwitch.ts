import { useStorage } from "@vueuse/core";

export type ThemeName = "light" | "dark";

export const themes: { name: ThemeName; icon: string }[] = [
  { name: "light", icon: "mdi:white-balance-sunny" },
  { name: "dark", icon: "mdi:moon-waning-crescent" },
];

// Switching theme grows the new colours out of the button in a circle.
export const useThemeSwitch = () => {
  // Ink unless the visitor saved Paper, the same rule as theme-loader.js.
  const current = useStorage<ThemeName>("vueuse-color-scheme", "dark", undefined, {
    serializer: {
      read: (saved) => (saved === "light" ? "light" : "dark"),
      write: (theme) => theme,
    },
  });

  watch(current, (theme) => {
    const { classList } = document.documentElement;
    classList.toggle("dark", theme === "dark");
    classList.toggle("light", theme === "light");
  });

  const setTheme = (next: ThemeName, event?: MouseEvent) => {
    const motionOff = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || motionOff) {
      current.value = next;
      return;
    }

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(async () => {
      current.value = next;
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
