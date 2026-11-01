export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event);

  const posts = await queryCollection(event, "blog")
    .where("published", "=", true)
    .select("path")
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
    ...posts.map((post) => post.path),
  ];

  setHeader(event, "content-type", "application/xml");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n")}
</urlset>`;
});
