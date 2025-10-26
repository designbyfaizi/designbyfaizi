# ---------------------------
# Build Stage
# ---------------------------
FROM oven/bun:1 AS builder
WORKDIR /app

# Install native build tools and Python
RUN apt-get update && \
    apt-get install -y python3 python3-dev python3-distutils g++ make

# Make python3 the default for node-gyp
ENV PYTHON=/usr/bin/python3

# Copy dependency files
COPY package.json bun.lock ./

# Install dependencies (including better-sqlite3)
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

# Install runtime dependencies for better-sqlite3
RUN apt-get update && \
    apt-get install -y python3 g++ make

# Copy built app and node_modules from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

# Expose Nuxt default port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV PYTHON=/usr/bin/python3

# Start the Nuxt server
CMD ["bun", "run", ".output/server/index.mjs"]

