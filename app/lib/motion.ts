// Shared motion settings, so every animation on the site feels related.
export const snappy = { type: "spring", stiffness: 420, damping: 30 } as const;
export const gentle = { type: "spring", stiffness: 180, damping: 24 } as const;
export const press = [0.76, 0, 0.24, 1] as const;

export const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: gentle },
};

export const stagger = (gap = 0.07, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
