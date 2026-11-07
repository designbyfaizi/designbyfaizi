// Step 2: GitHub sends the visitor back here with a code. The code is swapped for an
// access token, and a tiny page hands the token to the /admin window that opened the
// popup, using the message handshake Sveltia CMS (and Decap) expect.
import type { H3Event } from "h3";

// JSON inside a <script>: escape "<" so text from GitHub can't close the tag.
const inScript = (value: unknown) => JSON.stringify(value).replaceAll("<", "\\u003c");

const respond = (event: H3Event, result: object, ok: boolean) => {
  deleteCookie(event, "cms-auth-state", { path: "/api/auth" });
  const message = `authorization:github:${ok ? "success" : "error"}:${JSON.stringify(result)}`;
  setHeader(event, "content-type", "text/html; charset=utf-8");
  return `<!doctype html><meta charset="utf-8"><title>Signing in</title><script>
const origin = ${inScript(useRuntimeConfig(event).public.siteUrl)};
addEventListener("message", (e) => {
  if (e.data === "authorizing:github" && (e.origin === origin || e.origin === location.origin)) {
    opener?.postMessage(${inScript(message)}, e.origin);
  }
});
opener?.postMessage("authorizing:github", "*");
</script>`;
};

export default defineEventHandler(async (event) => {
  const { githubClientId, githubClientSecret } = useRuntimeConfig(event);
  const { code, state } = getQuery(event);

  if (!githubClientId || !githubClientSecret) {
    return respond(event, { provider: "github", error: "GitHub sign-in is not set up." }, false);
  }
  if (typeof code !== "string" || !state || state !== getCookie(event, "cms-auth-state")) {
    return respond(event, { provider: "github", error: "Sign-in expired. Please try again." }, false);
  }

  const answer = await $fetch<{ access_token?: string; error_description?: string }>(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: { accept: "application/json" },
      body: { client_id: githubClientId, client_secret: githubClientSecret, code },
    },
  ).catch(() => ({ access_token: undefined, error_description: "GitHub did not answer." }));

  if (!answer.access_token) {
    return respond(event, { provider: "github", error: answer.error_description ?? "GitHub refused the sign-in." }, false);
  }
  return respond(event, { provider: "github", token: answer.access_token }, true);
});
