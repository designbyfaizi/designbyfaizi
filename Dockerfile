# ---------------------------
# Build Stage
# ---------------------------
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the app
COPY . .

# Build the Nuxt app
RUN bun run build

# ---------------------------
# Runtime Stage
# ---------------------------
FROM oven/bun:1-slim AS runner
WORKDIR /app

# Install native dependencies for better-sqlite3
RUN apt-get update && apt-get install -y python3 g++ make

# Copy the built app from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

# Expose Nuxt default port
EXPOSE 3000

# Ensure environment variables are loaded
ENV NODE_ENV=production

# Start the server
CMD ["bun", "run", ".output/server/index.mjs"]

