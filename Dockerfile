# syntax=docker/dockerfile:1

# ---- Build ----
FROM oven/bun:1.4.4 AS build
WORKDIR /app

# Install dependencies first so this layer is cached when only source changes.
# --ignore-scripts avoids running `nuxt prepare` before nuxt.config.ts and the
# content files exist; `nuxt build` prepares the project itself.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun run build

# ---- Runtime ----
FROM oven/bun:1.4.4-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Nitro bundles the server and its dependencies into .output.
COPY --from=build /app/.output ./.output

# Nuxt Content keeps its SQLite database in here while the server runs.
RUN mkdir -p /app/.data

EXPOSE 3000

CMD ["bun", ".output/server/index.mjs"]
