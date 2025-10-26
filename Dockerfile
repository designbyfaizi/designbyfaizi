# ---- Base build image ----
FROM oven/bun:1.1.20 AS builder

WORKDIR /app

# Copy dependency files first (for caching)
COPY bun.lockb package.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build Nuxt
RUN bun run build


# ---- Runtime image ----
FROM oven/bun:1.1.20 AS runner
WORKDIR /app

# Copy only the built output from the builder
COPY --from=builder /app/.output ./.output

# Set environment variables for Nitro (Nuxt runtime)
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

# Expose the port
EXPOSE 3000

# Start the app using Bun
CMD ["bun", "run", ".output/server/index.mjs"]
