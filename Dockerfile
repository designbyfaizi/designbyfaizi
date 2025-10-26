# ---------------------------
# Build stage
# ---------------------------
FROM oven/bun:1 AS builder
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install

COPY . .
RUN bun run build

# ---------------------------
# Run stage
# ---------------------------
FROM oven/bun:1-slim AS runner
WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]
