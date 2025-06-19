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
RUN npm run build

# Production Stage
FROM node:20-alpine AS production
WORKDIR /app

# Install curl for health check
RUN apk add --no-cache curl

# Copy backend compiled code and dependencies
COPY --from=backend-build /app/server/dist ./server/dist
COPY --from=backend-build /app/server/package*.json ./server/
COPY --from=backend-build /app/server/node_modules ./server/node_modules

# Copy startup script
COPY server/start.sh ./server/start.sh
RUN chmod +x ./server/start.sh

# Copy frontend build
COPY --from=frontend-build /app/client/dist ./server/client/dist

# Create uploads directory and copy existing uploads
RUN mkdir -p /app/server/uploads
COPY server/uploads ./server/uploads

# Expose port
EXPOSE 5001

# Health check with increased timeout
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:5001/api/health || exit 1

# Start command - use startup script
WORKDIR /app/server
CMD ["./start.sh"] 