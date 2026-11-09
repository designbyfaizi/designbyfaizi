import type { SiteCollectionItem } from "@nuxt/content";

export const useSite = () => useState<SiteCollectionItem>("site");

// Prefer what was saved with the page so moving between pages never touches
// the content database in the browser.
export const fromPayload = (key: string, nuxtApp: { payload: any; static: any }) =>
  nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];

export const usePageSeo = (title: string, description: string, picture = "/og_index.jpg") => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const image = `${config.public.siteUrl}${picture}`;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: `${config.public.siteUrl}${route.path}`,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: "summary_large_image",
  });
};

// Reading time from the raw Markdown. Only what a reader actually reads counts as prose:
// frontmatter, image markup (alt text and paths) and link URLs are left out. Code is
// skimmed rather than read, and each picture takes a moment to look at.
const PROSE_WPM = 230;
const CODE_WPM = 400;
const SECONDS_PER_IMAGE = 12;

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

export const readingMinutes = (text = "") => {
  const body = text.replace(/^---\n[\s\S]*?\n---\n/, "");
  const code = body.match(/^```[\s\S]*?^```/gm) ?? [];
  let prose = body.replace(/^```[\s\S]*?^```/gm, "");
  const images = prose.match(/!\[[^\]]*\]\([^)]*\)(\{[^}]*\})?/g)?.length ?? 0;
  prose = prose
    .replace(/!\[[^\]]*\]\([^)]*\)(\{[^}]*\})?/g, "")
    .replace(/\]\([^)]*\)(\{[^}]*\})?/g, "]")
    .replace(/^\|[\s:|-]+\|$/gm, "");

  const minutes =
    countWords(prose) / PROSE_WPM +
    code.reduce((sum, block) => sum + countWords(block), 0) / CODE_WPM +
    (images * SECONDS_PER_IMAGE) / 60;
  return Math.max(1, Math.round(minutes));
};

export const shortDate = (date: string | Date) => new Date(date).toISOString().split("T")[0];
