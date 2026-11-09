---
title: Why I Love UnoCSS but Still Use Tailwind
description: How UnoCSS reimagined atomic CSS, the features I still miss, and why this site moved to Tailwind CSS v4 after four years on UnoCSS.
featured_image: /uploads/blog/unocss-cover.jpg
tags:
  - css
  - unocss
  - tailwind
published: false
created_at: 2025-04-04
updated_at: 2026-11-02
---

I'm a simple guy. I see something interesting, I try to learn more about it. I came across HTML and CSS in 2019, so I learned them. I saw JavaScript in 2020, so I learned it. Then I came across Tailwind and used it before my colleagues had even heard of it. (I'd learned Bootstrap before that, but I never really liked it.)

Then, in late 2022, I found something that changed the way I think about CSS entirely. It was more flexible than anything I'd used and simpler at the same time. Ladies and gentlemen, I introduce you to [UnoCSS](https://unocss.dev).

This site ran on UnoCSS from its very first commit in December 2022 until November 2026, when I rebuilt it on Tailwind CSS v4. This post is about both halves of that: why UnoCSS is brilliant, and why I switched anyway.

## Atomic CSS, quickly

If you haven't used either: atomic (or utility-first) CSS means styling with lots of tiny single-purpose classes instead of writing your own selectors.

```html
<a class="bg-stone-200 text-stone-900 px-4 py-2 rounded-lg hover:bg-stone-300">Link</a>
```

Each class does one thing. `px-4` sets horizontal padding, `rounded-lg` rounds the corners, `hover:bg-stone-300` changes the background on hover. You never name anything, and you never wonder whether deleting a CSS rule will break some other page. Tailwind made this approach mainstream. UnoCSS asked how it should work underneath.

## How UnoCSS reimagined atomic CSS

UnoCSS was created by Anthony Fu, a core team member of Vue, Vite and Nuxt, who was also on the team behind Windi CSS. In October 2021 he explained the thinking in a long post called [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css), and it's still one of the best things written about CSS tooling. Here is my summary.

### The problem: generate first, delete later

At the time, Tailwind worked by generating every utility it could possibly need up front, for every colour, size and variant, and then using PurgeCSS to delete the unused ones in the production build. The catch, in Anthony's words: "the purging would only work in the production build". During development, Vite had to serve megabytes of CSS, which made startup and hot reloading slow.

There was also a flexibility problem. Pre-generated utilities only cover the values someone predicted. In his example, Tailwind's `border-10` simply didn't work, because 10 wasn't in the default `borderWidth` scale. To add one rotation utility, he had to write a plugin whose code was longer than the CSS it produced: "The code to generate the CSS is even longer than the outcome."

Windi CSS and Tailwind's later JIT engine improved this by scanning your files before the build and generating only what they found. But they still read files separately from the bundler, needed their own file watcher, and parsed CSS into syntax trees.

### The solution: on demand, and nothing else

![Two approaches side by side. Generate and purge produces every possible utility and deletes unused ones in production. On demand reads your source and generates only the classes it finds](/uploads/blog/unocss-on-demand.webp){width="1600" height="2042"}

UnoCSS flips the order. It doesn't generate anything until it sees a class name in your code, in development and production alike. A few design decisions make that fast:

- **No core utilities.** Anthony calls it "an engine instead of a framework because there are no core utilities". Every class comes from rules you add, usually through presets.
- **No parsing, no AST.** Rules are strings or regular expressions, and the CSS is built with plain string concatenation. Each class name's output is cached, so the second `p-4` costs nothing.
- **It rides the bundler.** Instead of scanning the disk, UnoCSS reads the modules your build tool is already processing. Only files that end up in your app affect the CSS, and the bundler handles hot reloading.
- **No preflight by default.** It doesn't force a CSS reset on you, which matters when you're mixing it with another UI library.

### The benchmark

Anthony benchmarked generating 1,656 utilities, averaged over 50 runs:

![Bar chart of time to generate 1,656 utilities in October 2021: UnoCSS 4.97 milliseconds, Windi CSS 971.66 milliseconds, Tailwind CSS 3.0 alpha 1249.79 milliseconds](/uploads/blog/unocss-benchmark.webp){width="1600" height="1352"}

| Engine | Version | Time | Relative |
| --- | --- | --- | --- |
| UnoCSS | 0.0.0 | 4.97 ms | 1× |
| Windi CSS | 3.1.9 | 971.66 ms | 195× slower |
| Tailwind CSS | 3.0.0-alpha.1 | 1,249.79 ms | 251× slower |

Two honest caveats. These are 2021 numbers against an alpha of Tailwind 3, and Tailwind has been rewritten since. And Anthony himself said the difference may not be noticeable in practice, adding: "Given all the flexibility and imagination UnoCSS brings, I would frankly think performance can be a less important thing to care about." I agree. Speed got me to try UnoCSS. The flexibility is what kept me.

## The features I fell in love with

### Rules: utilities are just data

A rule is a pair: what to match, and what CSS to produce. A static rule matches one exact class:

```ts
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

A dynamic rule uses a regular expression and a function, so one line covers every value:

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
]
```

Now `m-3`, `m-17` and `m-100` all work, and only the ones you use are generated. In my first version of this site, I used rules for my fonts, which felt like cheating compared with editing a Tailwind config:

```ts
rules: [
  ['font-tanker', { 'font-family': 'Tanker' }],
  ['font-satoshi', { 'font-family': 'Satoshi' }],
],
```

### Shortcuts: name a group of classes

Shortcuts combine utilities under one name. My 2025 version of this site had a button shortcut that I used everywhere:

```ts
shortcuts: [
  {
    'aqler-button': [
      'bg-primary text-primary-foreground px-4 py-2 rounded-full',
      'hover:bg-primary/90 ring-2 ring-transparent hover:ring-primary/20',
    ],
    'aqler-press': 'active:scale-98 transition-all duration-100',
  },
],
```

Shortcuts can be dynamic too. With `[/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`]`, both `btn-green` and `btn-red` work without defining either.

### Variant groups: my favourite

This is the feature I miss most. The variant group transformer lets you write a prefix once and apply it to several utilities:

```html
<div class="hover:(bg-gray-400 font-medium) font-(light mono)" />
```

UnoCSS expands it to `hover:bg-gray-400 hover:font-medium font-light font-mono`. I used it all over the old site, in components like `hover:(bg-background-second) active:(scale-98)`. Long `class` attributes become readable again.

### Attributify mode

With the attributify preset, utilities can be split into HTML attributes by category:

```html
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>
```

You can even drop the attribute value: `<div m-2 rounded text-teal-400 />` works. I never went all in on this, but it's a great example of what a rule engine allows.

### Pure CSS icons

The icons preset turns any of the [Iconify](https://iconify.design) icon sets, hundreds of thousands of icons, into classes. `i-ph-anchor-simple-thin` is the thin anchor from Phosphor. The icon is embedded in the CSS as an SVG mask, so it takes the current text colour, needs no JavaScript and no component import, and only the icons you use end up in the bundle:

```html
<button class="i-carbon-sun dark:i-carbon-moon" />
```

That one line is a theme toggle icon that swaps in dark mode.

### Presets, directives and the inspector

- **Presets** bundle rules for you. `preset-wind3` is compatible with Tailwind 3, and `preset-wind4` with Tailwind 4. (The older `preset-uno` and `preset-wind` were renamed to `preset-wind3`.) There are also presets for web fonts, typography and more. I loaded the Gabarito typeface with `presetWebFonts` in 2025.
- **Directives** give you `@apply`, `theme()` and `@screen` in your CSS, plus `--at-apply` for when your editor complains about unknown at-rules.
- **The inspector** shows exactly which classes UnoCSS found in each file and what CSS it generated. It's how I debugged more than one mystery.

### Setting it up in Nuxt

It takes two files:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
})
```

```ts
// uno.config.ts
import { defineConfig, presetWind4, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
  transformers: [transformerVariantGroup()],
})
```

The module injects the generated CSS for you, so there's no import to remember.

## So why does this site use Tailwind now?

In November 2026 I rebuilt this site from scratch, and I chose Tailwind CSS v4. It wasn't because UnoCSS got worse. It was because Tailwind got better, and because of everything around the CSS engine.

### Tailwind caught up on the ideas

Many of the problems in Anthony's post have been addressed since. Tailwind v3 made just-in-time generation the default, so the generate-then-purge era ended. Tailwind v4 went further:

- **A new engine.** Tailwind v4 was rewritten from the ground up. Its team reports full builds up to 5× faster than v3 and incremental builds over 100× faster, "measured in microseconds".
- **Dynamic values.** Spacing comes from a single variable, so `w-17` and `grid-cols-15` work without configuration, and `border-10` now produces `border-width: 10px`. The exact example from 2021 works out of the box.
- **CSS-first configuration.** Design tokens live in CSS with `@theme`, not in a JavaScript config file. This site's whole design system is CSS variables in one stylesheet.
- **Automatic source detection.** No more `content` array to keep up to date.

UnoCSS still has more power. But "more power" matters less once the default covers almost everything you need.

### The ecosystem expects Tailwind

This is the main reason. This site is built on [shadcn-vue](https://www.shadcn-vue.com), and component libraries like it ship their components written in Tailwind classes, generated by a CLI that writes Tailwind. Plugins like the typography plugin that styles this very post, the class sorting plugin for Prettier, and most UI examples online all assume Tailwind. With UnoCSS's Wind presets most of that works, but "most" means occasionally debugging the gap between two engines instead of building.

### Other people can read it

I work with other developers and clients, and Tailwind is the shared language. Anyone who opens this repository can read every class without learning my shortcuts or my rules. Variant groups and attributify are lovely, but they're dialects. When I hand a project over, I want the next person to feel at home on day one.

### What I gave up

- **Variant groups.** I write `hover:bg-rose-500 hover:text-white` in full now, and I notice it every time.
- **Pure CSS icons.** I use the [Nuxt Icon](https://github.com/nuxt/icon) module instead, which bundles the icons the site uses as components. It works well, but `i-carbon-sun` was more elegant.
- **Custom rules in one line.** In Tailwind v4 I write a custom utility with `@utility` in CSS. It's good, but a regular expression in UnoCSS can still do things no CSS syntax can.

## Which one should you use?

| If you... | Pick |
| --- | --- |
| Use shadcn-vue, shadcn/ui or another Tailwind-based component library | Tailwind |
| Work in a team, or hand projects to clients and other developers | Tailwind |
| Want your own design language with custom rules and naming | UnoCSS |
| Love variant groups, attributify mode or pure CSS icons | UnoCSS |
| Need a runtime build with no build step, straight from a CDN | UnoCSS |
| Are learning utility-first CSS for the first time | Tailwind, then try UnoCSS |

For a personal experiment or a project where I control the whole design system, I'd still reach for UnoCSS without hesitating. For client work and anything built on shared components, Tailwind is the practical choice.

## The real lesson

UnoCSS changed how I think about CSS tools. Utilities aren't magic: they're rules that match a class name and return some CSS, and you can write your own. Once you see it that way, Tailwind becomes easier to understand too, and its `@utility` and `@theme` features make a lot more sense.

So I love UnoCSS, I still use Tailwind, and I don't think those two things contradict each other. If you haven't tried it, open the [UnoCSS playground](https://unocss.dev/play/) and type a few classes. And read Anthony's post, it's worth it.

### Sources

- Anthony Fu, [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css), October 2021
- [UnoCSS documentation](https://unocss.dev/guide/), including [Why UnoCSS?](https://unocss.dev/guide/why)
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4)
