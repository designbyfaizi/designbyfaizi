export default defineEventHandler(async (event) => {
  const posts = await getInstagramPosts(event);

  setHeader(event, "cache-control", "public, max-age=600");

  // The image address stays on the server, the browser only sees our own route.
  return posts.map(({ source, ...post }) => ({
    ...post,
    image: `/api/instagram/image/${post.id}`,
  }));
});
