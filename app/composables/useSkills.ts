export const skillSlug = (stem: string) => stem.split("/").pop()!;

export const useSkills = () =>
  useAsyncData("skills", () => queryCollection("skill").order("order", "ASC").all(), {
    getCachedData: fromPayload,
  });
