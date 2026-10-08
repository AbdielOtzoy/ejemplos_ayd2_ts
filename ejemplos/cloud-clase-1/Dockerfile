FROM nginx:1.28-alpine
ARG VERSION=v1
ARG AMBIENTE=local
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY web/assets/ /usr/share/nginx/html/assets/
COPY web/styles.css /usr/share/nginx/html/styles.css
COPY web/${VERSION}/index.html /usr/share/nginx/html/index.html
RUN case "$VERSION" in v1|v2) ;; *) exit 1 ;; esac \
    && case "$AMBIENTE" in local) ;; *) exit 1 ;; esac \
    && sed -i "s/AMBIENTE_DEMO/${AMBIENTE}/g" /usr/share/nginx/html/index.html
EXPOSE 80
