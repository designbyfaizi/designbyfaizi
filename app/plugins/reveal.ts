import { animate } from "motion-v";
import type { ObjectDirective } from "vue";

type RevealTarget = HTMLElement & { _stopReveal?: () => void };

const SCROLL_KEYS = new Set(["ArrowDown", "PageDown", "End", " "]);

// v-reveal fades an element up as it scrolls into view. Everything stays
// visible until the visitor actually starts scrolling, so the page is complete
// without scripts, in print and in full-page screenshots.
export default defineNuxtPlugin((nuxtApp) => {
  let armed = false;
  const waiting = new Set<() => void>();

  if (import.meta.client) {
    const arm = () => {
      if (armed) return;
      armed = true;
      waiting.forEach((start) => start());
      waiting.clear();
      window.removeEventListener("wheel", arm);
      window.removeEventListener("touchmove", arm);
      window.removeEventListener("keydown", onKey);
    };
    const onKey = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) arm();
    };
    window.addEventListener("wheel", arm, { passive: true });
    window.addEventListener("touchmove", arm, { passive: true });
    window.addEventListener("keydown", onKey);
  }

  const hideUntilSeen = (el: RevealTarget, delay: number) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.opacity = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        animate(
          el,
          { opacity: [0, 1], y: [28, 0], scale: [0.98, 1] },
          { type: "spring", stiffness: 190, damping: 24, delay },
        ).finished.then(() => {
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
        });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    el._stopReveal = () => observer.disconnect();
  };

  const reveal: ObjectDirective<RevealTarget, number | undefined> = {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const start = () => hideUntilSeen(el, binding.value ?? 0);
      if (armed) {
        start();
        return;
      }
      waiting.add(start);
      el._stopReveal = () => waiting.delete(start);
    },
    unmounted(el) {
      el._stopReveal?.();
    },
  };

  nuxtApp.vueApp.directive("reveal", reveal);
});
