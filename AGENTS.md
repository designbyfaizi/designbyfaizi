# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Overview

Personal portfolio site for designbyfaizi.com: Nuxt 4, Vue 3, Tailwind CSS v4, shadcn-vue (reka-ui), `motion-v`, and `@nuxt/content`, running on Bun. `README.md` is a GitHub profile card, not project documentation.

## Commands

```bash
bun install          # also runs `nuxt prepare` through postinstall
bun run dev          # dev server
bun run build        # nuxt build, then copies .output/public to dist/ (scripts/make-dist.mjs)
bun run start        # serve the production build (.output/server/index.mjs)
```

There is no test runner, linter, or formatter, and `vue-tsc` is not installed. `bun run build` is the only automated check: it validates the content schemas and prerenders every linked page.

Always run Nuxt through `bun --bun` (the package scripts already do). `content.experimental.sqliteConnector` is `"bun"` and the Nitro preset is `bun`, so running under Node breaks the content database.

## Architecture

### Content

All copy and portfolio data live in `content/` as YAML and Markdown, queried with `queryCollection`. Nothing about a project, skill, or artwork belongs in a component.

A content schema is defined twice and the two must stay in sync:

- `content.config.ts`: the zod schemas used at build time.
- `public/admin/config.yml`: the Sveltia CMS forms served at `/admin`. Each save there commits to `main` (`content: ...` messages) and triggers a rebuild, so expect those commits on `main`. `public/admin/sveltia-cms.js` and `public/admin/chunks/` are vendored; don't edit them.

Adding a field to `content/site.yml` touches both of those files plus the page that reads it. Blog posts rely on `rawbody` in the schema for reading time, and only posts with `published: true` are shown.

`nuxt.config.ts` reads `content/skills/*.yml` at config time and bundles the icons named there. A skill icon from a set outside `iconSets` still works but loads from Iconify at runtime.

### Data loading

Pages are prerendered (`crawlLinks: true`) and the browser should never query the content database. Follow the existing pattern when loading content:

- Site-wide text: `useSite()`. It is filled once on the server by `app/plugins/site.ts`.
- Collections: `useAsyncData` with `getCachedData: fromPayload` (`app/composables/useSite.ts`), wrapped in a composable in `useContentLists.ts` or `useSkills.ts` when more than one page uses it.

Omitting `getCachedData: fromPayload` makes client-side navigation hit the content database in the browser.

A new page must be linked from somewhere to be prerendered. Add it to the hardcoded path list in `server/routes/sitemap.xml.ts`, and to `app/utils/navLinks.ts` if it belongs in the navigation.

### Server

`server/` handles what can't be prerendered. `/api` is excluded from prerendering.

- `api/contact.post.ts`: emails the contact form through nodemailer. `shared/contact.ts` holds the zod schema used by both the form and the server (import as `#shared/contact`). Rate limiting is in-memory, per IP.
- `routes/sitemap.xml.ts`, `routes/feed.xml.ts`: generated from content and prerendered.

`/art` is entirely content-driven: artwork is managed in the CMS and stored in `content/art/`. The optional `link` field is the Instagram post, shown as a "View on Instagram" link in the lightbox. There is no Instagram API integration.

### Components

- `app/components/` auto-imports without a path prefix.
- `app/components/ui/` is shadcn-vue, registered by the `shadcn-nuxt` module rather than Nuxt's component scan (hence the `ui/**` ignore in `nuxt.config.ts`).
- Home page sections below the hero use lazy hydration (`<LazyX :hydrate-on-visible="ahead">` in `app/pages/index.vue`), so the page isn't hydrated in one long task on load. Give new below-the-fold sections the same treatment.
- Deliberately disabled: `app/pages/about.vue` (the About page was removed; it's in Nuxt's `ignore`), and `SpotlightCard.vue` and `ThemePicker.vue` (excluded from auto-import).

### Design system

The site is styled as a two-ink print job: rose is the design plate, black is the code plate, on paper. Components, motion, and comments all use this print vocabulary (plates, registration, overprint, halftone, slug lines, sheets).

- Tokens and utility classes are in `app/assets/css/main.css`. `--radius` is `0`, so corners are square. Use `.sheet` for section margins, `.slug` for small mono labels, `.display` and `.mega` for headline type. Use the token colors (`primary`, `rose-ink`, `foreground`, ...) so light and dark both work.
- Fonts come from Fontsource: Bricolage Grotesque (sans/display), Newsreader (serif), JetBrains Mono, Noto Nastaliq Urdu.
- Use the spring and easing presets in `app/lib/motion.ts` rather than new values.
- Size in-flow sections with `svh`, not `dvh`: `dvh` changes whenever a mobile browser's toolbar shows or hides, shifting the page while scrolling. `dvh` is only for fixed overlays (the mobile menu, the art lightbox).
- Animations must respect `prefers-reduced-motion` and leave the page complete without JavaScript. Any element that starts hidden for an entrance animation needs the `data-enter` attribute, which the `<noscript>` style in `app/app.vue` uses to reveal it. For scroll-in effects use the `v-reveal` directive (`app/plugins/reveal.ts`; its value is a delay).
- Page changes run through `InkWipe` in `app/app.vue`, and the theme switch is a view transition in `useThemeSwitch`. `public/theme-loader.js` sets the theme class before paint and shares the `vueuse-color-scheme` localStorage key with `useThemeSwitch`.
- There are two themes, Paper and Ink. Ink (dark) is the default and the OS preference is ignored; only a saved `light` gives Paper. Prerendered HTML can't know the visitor's theme, so style anything theme-dependent with `dark:` variants rather than binding classes to `useThemeSwitch().current`, which hydrates stale.

## Deployment

`Dockerfile` builds a Bun image deployed on Dokploy, listening on port 3000. Nuxt Content writes its SQLite database under `/app/.data` at runtime, so the image creates that folder.

Runtime environment variables: `NUXT_SMTP_USER`, `NUXT_SMTP_PASSWORD`, `NUXT_SMTP_TO` (optional, defaults to the user). Without SMTP credentials the contact endpoint returns 503.

## Stale references

- Comments in `nuxt.config.ts` point to `EDITING.md`, which is not in the repository.
- `components.json` lists `app/assets/styles/main.css`; the real stylesheet is `app/assets/css/main.css`. Correct this before relying on the shadcn-vue CLI to touch CSS.
