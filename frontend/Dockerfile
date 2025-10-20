# Multi-stage build for Vite React app using Node slim

# 1) Builder stage
FROM node:20-slim AS builder

# Accept build arguments
ARG VITE_STRIPE_PUBLISHABLE_KEY
ARG VITE_TRCP_URL
ARG VITE_BASE_URL
ARG GENERATE_SOURCEMAP
ARG VITE_ENABLE_ANALYTICS

# Set environment variables from build args
ENV VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY}
ENV VITE_TRCP_URL=${VITE_TRCP_URL}
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
ENV VITE_ENABLE_ANALYTICS=${VITE_ENABLE_ANALYTICS}

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
