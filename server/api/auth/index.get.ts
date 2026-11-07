import { randomBytes } from "node:crypto";

// Step 1 of "Sign in with GitHub" on /admin. Sveltia CMS opens this in a popup
// (backend.base_url + auth_endpoint in public/admin/config.yml), and it sends the
// visitor on to GitHub. A random state in a cookie ties the answer to this request.
export default defineEventHandler((event) => {
  const { githubClientId } = useRuntimeConfig(event);
  if (!githubClientId) {
    throw createError({ statusCode: 503, statusMessage: "GitHub sign-in is not set up." });
  }

  const { scope } = getQuery(event);
  const state = randomBytes(16).toString("hex");
  setCookie(event, "cms-auth-state", state, {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: 600,
  });

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", githubClientId);
  url.searchParams.set("scope", typeof scope === "string" && /^[a-z:_,]+$/.test(scope) ? scope : "repo,user");
  url.searchParams.set("state", state);
  return sendRedirect(event, url.toString());
});
