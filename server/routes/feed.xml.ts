const escapeXml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event);

  const posts = await queryCollection(event, "blog")
    .where("published", "=", true)
    .select("path", "title", "description", "created_at")
    .order("created_at", "DESC")
    .all();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}${post.path}</link>
      <guid>${siteUrl}${post.path}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  setHeader(event, "content-type", "application/rss+xml");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Design By Faizi</title>
    <link>${siteUrl}/blog</link>
    <description>Writing from Faizi</description>
${items}
  </channel>
</rss>`;
});
