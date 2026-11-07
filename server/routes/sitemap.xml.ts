export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event);

  const posts = await queryCollection(event, "blog")
    .where("published", "=", true)
    .select("path", "created_at", "updated_at")
    .all();
  const skills = await queryCollection(event, "skill").select("stem").all();

  const paths = [
    "/",
    "/projects",
    "/creations",
    "/skills",
    "/blog",
    "/art",
    "/contact",
    ...skills.map((skill) => `/skills/${skill.stem.split("/").pop()}`),
  ];
  // Posts carry the date they last changed, so crawlers know when to look again.
  const entries = [
    ...paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`),
    ...posts.map((post) => {
      const lastmod = new Date(post.updated_at ?? post.created_at).toISOString().split("T")[0];
      return `  <url><loc>${siteUrl}${post.path}</loc><lastmod>${lastmod}</lastmod></url>`;
    }),
  ];

  setHeader(event, "content-type", "application/xml");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;
});
