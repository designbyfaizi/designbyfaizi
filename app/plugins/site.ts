// Loads the site-wide text once while each page is generated, so the browser
// never has to query the content database for it.
export default defineNuxtPlugin(async () => {
  const site = useState<Awaited<ReturnType<typeof loadSite>>>("site");
  if (import.meta.server) site.value = await loadSite();
});

const loadSite = () => queryCollection("site").first();
