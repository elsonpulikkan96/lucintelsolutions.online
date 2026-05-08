# Stage 1: Build React app
FROM --platform=linux/amd64 node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM --platform=linux/amd64 nginx:1.27-alpine

# OCI metadata labels
LABEL org.opencontainers.image.source="https://github.com/elsonpulikkan96/lucintelsolutions.online"
LABEL org.opencontainers.image.description="Lucintel Solutions website"

# Create non-root user and set permissions
RUN adduser -D -u 1001 appuser && \
    chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /run && \
    rm -rf /var/cache/apk/*

# Custom Nginx config with security headers, gzip, and caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build from stage 1
COPY --from=build --chown=appuser:appuser /app/build /usr/share/nginx/html

# Run as non-root user
USER appuser
EXPOSE 8080

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
