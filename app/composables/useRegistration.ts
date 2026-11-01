import { useMotionValue, useSpring } from "motion-v";
import { useEventListener } from "@vueuse/core";

// The rose plate sits slightly out of register and drifts with the pointer,
// the way two inks shift on a press.
export const useRegistration = (base = 6, range = 10) => {
  const targetX = useMotionValue(base);
  const targetY = useMotionValue(base * 0.6);
  const spring = { stiffness: 120, damping: 18 };
  const x = useSpring(targetX, spring);
  const y = useSpring(targetY, spring);

  if (import.meta.client) {
    // The offset shrinks with the sheet so small screens stay crisp.
    const fit = () => Math.min(1, window.innerWidth / 1200);

    onMounted(() => {
      targetX.jump(base * fit());
      targetY.jump(base * 0.6 * fit());
      x.jump(base * fit());
      y.jump(base * 0.6 * fit());
    });

    useEventListener(window, "pointermove", (event: PointerEvent) => {
      const dx = event.clientX / window.innerWidth - 0.5;
      const dy = event.clientY / window.innerHeight - 0.5;
      targetX.set((base + dx * range * 2) * fit());
      targetY.set((base * 0.6 + dy * range * 2) * fit());
    });
  }

  return { x, y };
};
