FROM node:22-alpine AS base
RUN apk add --no-cache gcompat
RUN corepack enable # Enables pnpm

# Stage 1: Install dependencies
FROM base AS dependencies
WORKDIR /app
# Copy package.json and pnpm-lock.yaml.
# Ensure pnpm-lock.yaml is present in the build context.
COPY package.json pnpm-lock.yaml ./
# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
# Copy installed dependencies from the 'dependencies' stage
COPY --from=dependencies /app/node_modules /app/node_modules
# Copy source code and necessary configuration files
COPY package.json tsconfig.json ./
COPY src ./src/
# Build the application
RUN pnpm run build
# Remove devDependencies after build
RUN pnpm prune --prod

# Stage 3: Runner image
FROM base AS runner
WORKDIR /app

# Create non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

# Copy production dependencies, built application, and package.json from 'builder' stage
COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.cjs"]