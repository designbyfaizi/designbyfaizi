import { defineConfig, presetWind3, transformerVariantGroup } from 'unocss';
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind3({
      dark: 'class'
    }),
  ],
  theme: {
    colors: {
      background: 'oklch(var(--background))',
      foreground: 'oklch(var(--foreground))',
      card: 'oklch(var(--card))',
      cardForeground: 'oklch(var(--card-foreground))',
      popover: 'oklch(var(--popover))',
      popoverForeground: 'oklch(var(--popover-foreground))',
      primary: 'oklch(var(--primary))',
      primaryForeground: 'oklch(var(--primary-foreground))',
      secondary: 'oklch(var(--secondary))',
      secondaryForeground: 'oklch(var(--secondary-foreground))',
      muted: 'oklch(var(--muted))',
      mutedForeground: 'oklch(var(--muted-foreground))',
      accent: 'oklch(var(--accent))',
      accentForeground: 'oklch(var(--accent-foreground))',
      destructive: 'oklch(var(--destructive))',
      destructiveForeground: 'oklch(var(--destructive-foreground))',
      border: 'oklch(var(--border))',
      input: 'oklch(var(--input))',
      ring: 'oklch(var(--ring))',
      radius: 'var(--radius)',
      chart1: 'oklch(var(--chart-1))',
      chart2: 'oklch(var(--chart-2))',
      chart3: 'oklch(var(--chart-3))',
      chart4: 'oklch(var(--chart-4))',
      chart5: 'oklch(var(--chart-5))',
    }
  },
  shortcuts: [
    {
      "aqler-container": "max-w-screen-xl w-full mx-auto px-8",
      "aqler-button": [
        "bg-primary text-primary-foreground px-4 py-2 rounded-full",
        "hover:bg-primary/90 ring-2 ring-transparent hover:ring-primary/20",
      ],
      "aqler-button-light": [
        "bg-card border border-secondary-foreground/10 text-secondary-foreground px-4 py-2 rounded-full",
        "hover:bg-secondary/90 ring-2 ring-transparent hover:ring-secondary-foreground/20",
        ""
      ],
      "aqler-press": "active:scale-98 transition-all duration-100",
    }
  ],
  transformers: [
    transformerVariantGroup()
  ]
})