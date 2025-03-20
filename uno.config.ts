import { defineConfig, presetWind3, presetWebFonts, presetTypography, transformerVariantGroup } from 'unocss';
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind3({
      dark: 'class'
    }),
    // presetWebFonts({
    //   provider: 'google',
    //   fonts: {
    //     sans: [
    //       {
    //         name: 'Gabarito',
    //         weights: ['400', '500', '600', '700', '800', '900']
    //       }
    //     ],
    //     mono: ['Fira Code', 'Fira Mono:400,700']
    //   }
    // }),
    presetTypography()
  ],
  theme: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: 'hsl(var(--card))',
      cardForeground: 'hsl(var(--card-foreground))',
      popover: 'hsl(var(--popover))',
      popoverForeground: 'hsl(var(--popover-foreground))',
      primary: 'hsl(var(--primary))',
      primaryForeground: 'hsl(var(--primary-foreground))',
      secondary: 'hsl(var(--secondary))',
      secondaryForeground: 'hsl(var(--secondary-foreground))',
      muted: 'hsl(var(--muted))',
      mutedForeground: 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--accent))',
      accentForeground: 'hsl(var(--accent-foreground))',
      destructive: 'hsl(var(--destructive))',
      destructiveForeground: 'hsl(var(--destructive-foreground))',
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      radius: 'var(--radius)',
      chart1: 'hsl(var(--chart-1))',
      chart2: 'hsl(var(--chart-2))',
      chart3: 'hsl(var(--chart-3))',
      chart4: 'hsl(var(--chart-4))',
      chart5: 'hsl(var(--chart-5))',
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
      "aqler-press": "active:scale-98 transition-all duration-100"
    }
  ],
  transformers: [
    transformerVariantGroup()
  ]
})