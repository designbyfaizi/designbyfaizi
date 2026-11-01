import type { SiteCollectionItem } from "@nuxt/content";

export const useSite = () => useState<SiteCollectionItem>("site");

// Prefer what was saved with the page so moving between pages never touches
// the content database in the browser.
export const fromPayload = (key: string, nuxtApp: { payload: any; static: any }) =>
  nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];

export const usePageSeo = (title: string, description: string) => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const image = `${config.public.siteUrl}/og_index.jpg`;

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

export const readingMinutes = (text = "") =>
  Math.max(1, Math.round(text.split(/\s+/).length / 200));

export const shortDate = (date: string | Date) => new Date(date).toISOString().split("T")[0];
