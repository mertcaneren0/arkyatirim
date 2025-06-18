# Multi-stage Dockerfile for Full-stack App

# Frontend Build Stage
FROM node:20-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Backend Build Stage  
FROM node:20-alpine AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
# Skip TypeScript compilation, use ts-node in production

# Production Stage
FROM node:20-alpine AS production
WORKDIR /app

# Install serve for frontend
RUN npm install -g serve

# Copy backend source (not compiled)
COPY --from=backend-build /app/server/src ./server/src
COPY --from=backend-build /app/server/package*.json ./server/
COPY --from=backend-build /app/server/tsconfig.json ./server/
COPY --from=backend-build /app/server/node_modules ./server/node_modules
WORKDIR /app/server

# Copy frontend build
COPY --from=frontend-build /app/client/dist ./client/dist

# Create uploads directory
RUN mkdir -p /app/server/uploads

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/api/health || exit 1

# Start command
WORKDIR /app/server
CMD ["npx", "ts-node", "src/index.ts"] 