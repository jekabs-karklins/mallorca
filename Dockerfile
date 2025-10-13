# Multi-stage build for Vite React app using Node slim

# 1) Builder stage
FROM node:20-slim AS builder

# Install dependencies required by some node modules if needed (mostly optional for Vite)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#   python3 make g++ \
#   && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# 2) Runtime stage
FROM node:20-slim AS runner
WORKDIR /app

# Install a lightweight static server
RUN npm i -g serve@14

# Copy built assets
COPY --from=builder /app/dist ./dist

# Expose port and start server (default 8080; can be overridden via PORT env)
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
