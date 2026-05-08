# Stage 1: Build React app
FROM --platform=linux/amd64 node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM --platform=linux/amd64 nginx:1.27-alpine

LABEL org.opencontainers.image.source="https://github.com/elsonpulikkan96/lucintelsolutions.online"
LABEL org.opencontainers.image.description="Lucintel Solutions website"

# Custom Nginx config with security headers, gzip, and caching
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
