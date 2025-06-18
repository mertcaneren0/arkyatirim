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

# Install serve for frontend
RUN npm install -g serve

# Copy backend
COPY --from=backend-build /app/server/dist ./server/dist
COPY --from=backend-build /app/server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

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
CMD ["npm", "start"] 