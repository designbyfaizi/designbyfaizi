// Instagram's image addresses expire and refuse to load on other sites, so the
// server fetches each picture. Only ids from the feed work, nothing else is proxied.
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const posts = await getInstagramPosts(event);
  const post = posts.find((item) => item.id === id);

  if (!post) throw createError({ statusCode: 404, statusMessage: "Image not found" });

  const image = await fetch(post.source);
  if (!image.ok) throw createError({ statusCode: 502, statusMessage: "Image unavailable" });

  setHeader(event, "content-type", image.headers.get("content-type") ?? "image/jpeg");
  setHeader(event, "cache-control", "public, max-age=86400");
  return new Uint8Array(await image.arrayBuffer());
});
