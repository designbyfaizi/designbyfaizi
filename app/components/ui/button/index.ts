import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

// Buttons carry a second ink plate out of register. It slides into place on hover.
const plate = "transition-[box-shadow,translate,background-color,color] hover:translate-x-[3px] hover:translate-y-[3px]"

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-mono uppercase tracking-[0.08em] outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `bg-foreground text-background shadow-[4px_4px_0_var(--primary)] hover:shadow-[0_0_0_var(--primary)] ${plate}`,
        rose: `bg-primary text-ink shadow-[4px_4px_0_var(--foreground)] hover:shadow-[0_0_0_var(--foreground)] ${plate}`,
        onRose: `bg-ink text-paper shadow-[4px_4px_0_var(--color-paper)] hover:shadow-[0_0_0_var(--color-paper)] ${plate}`,
        outline: "border border-foreground transition-colors hover:bg-foreground hover:text-background",
        ghost: "transition-colors hover:text-rose-ink",
        link: "text-rose-ink underline-offset-4 hover:underline",
      },
      size: {
        "default": "h-11 px-5 text-xs",
        "sm": "h-8 px-3 text-[0.6875rem]",
        "lg": "h-14 px-7 text-sm",
        "icon": "size-10",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
