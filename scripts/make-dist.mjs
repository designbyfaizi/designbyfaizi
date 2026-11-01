// `nuxt build` writes the Node server your VPS runs, with every page already
// rendered. This keeps a plain static copy of those pages in dist/ as well.
import { cpSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
cpSync(".output/public", "dist", { recursive: true });
