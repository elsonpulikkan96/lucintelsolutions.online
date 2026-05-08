FROM --platform=linux/amd64 node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x node_modules/.bin/* && npm run build

FROM --platform=linux/amd64 nginx:1.27-alpine
RUN adduser -D -u 1001 appuser && \
    chown -R appuser:appuser /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /run && \
    sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf
COPY --from=build --chown=appuser:appuser /app/build /usr/share/nginx/html
USER appuser
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
