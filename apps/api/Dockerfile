# Multi-stage build for OpusCore API

# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/database/package*.json ./packages/database/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run db:generate --workspace=@opuscore/database

# Build the application
RUN npm run build --workspace=@opuscore/api

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/database/package*.json ./packages/database/
COPY packages/shared/package*.json ./packages/shared/

RUN npm ci --only=production

# Copy built artifacts from builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "apps/api/dist/main.js"]
