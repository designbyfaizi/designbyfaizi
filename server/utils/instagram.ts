import type { H3Event } from "h3";

const REFRESH_AFTER_MS = 30 * 24 * 60 * 60 * 1000;
const POSTS_PER_ACCOUNT = 24;

export type InstagramPost = {
  id: string;
  account: string;
  caption: string;
  link: string;
  source: string;
  date: string;
};

type Media = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

type SavedToken = { token: string; savedAt: number };

// Instagram tokens last 60 days. Renewing every 30 keeps the feed alive with no
// one touching it; the renewed token is kept in the server's data folder.
const currentToken = async (api: string, account: string, fromSettings: string) => {
  const storage = useStorage("data");
  const key = `instagram:${account}`;
  const saved = await storage.getItem<SavedToken>(key);
  const token = saved?.token ?? fromSettings;

  if (saved && Date.now() - saved.savedAt < REFRESH_AFTER_MS) return token;

  try {
    const renewed = await $fetch<{ access_token: string }>(`${api}/refresh_access_token`, {
      query: { grant_type: "ig_refresh_token", access_token: token },
    });
    await storage.setItem(key, { token: renewed.access_token, savedAt: Date.now() });
    return renewed.access_token;
  } catch {
    return token;
  }
};

const fetchAccount = async (
  api: string,
  account: string,
  fromSettings: string,
): Promise<InstagramPost[]> => {
  const token = await currentToken(api, account, fromSettings);
  const { data } = await $fetch<{ data: Media[] }>(`${api}/me/media`, {
    query: {
      fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
      limit: POSTS_PER_ACCOUNT,
      access_token: token,
    },
  });

  return data.flatMap((media) => {
    const source = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
    if (!source) return [];
    return [
      {
        id: media.id,
        account,
        caption: media.caption ?? "",
        link: media.permalink,
        source,
        date: media.timestamp,
      },
    ];
  });
};

// Asks Instagram at most once an hour. One account failing never hides the other.
export const getInstagramPosts = defineCachedFunction(
  async (event: H3Event) => {
    const { instagram } = useRuntimeConfig(event);
    const accounts = [
      { name: "khak.csar", token: instagram.tokenKhakDotCsar },
      { name: "khakcsar", token: instagram.tokenKhakcsar },
    ].filter((account) => account.token);

    const results = await Promise.allSettled(
      accounts.map((account) => fetchAccount(instagram.api, account.name, account.token)),
    );

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Instagram feed failed for @${accounts[index]!.name}:`, result.reason);
      }
    });

    return results
      .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
      .sort((a, b) => b.date.localeCompare(a.date));
  },
  { name: "instagram-posts", getKey: () => "all", maxAge: 60 * 60, swr: true },
);
