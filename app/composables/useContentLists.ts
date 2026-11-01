export const useProjects = () =>
  useAsyncData("projects", () => queryCollection("project").order("date", "DESC").all(), {
    getCachedData: fromPayload,
  });

export const useClients = () =>
  useAsyncData("clients", () => queryCollection("client").order("order", "ASC").all(), {
    getCachedData: fromPayload,
  });

export const useArtworks = () =>
  useAsyncData("art", () => queryCollection("art").order("order", "ASC").all(), {
    getCachedData: fromPayload,
  });

export const usePosts = () =>
  useAsyncData(
    "blog",
    () =>
      queryCollection("blog")
        .where("published", "=", true)
        .select("path", "title", "description", "featured_image", "tags", "created_at", "rawbody")
        .order("created_at", "DESC")
        .order("title", "ASC")
        .all(),
    {
      getCachedData: fromPayload,
      transform: (items) =>
        items.map(({ rawbody, ...post }) => ({ ...post, minutes: readingMinutes(rawbody) })),
    },
  );
