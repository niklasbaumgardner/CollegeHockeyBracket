FROM caddy:builder AS builder

RUN xcaddy build \
    --with github.com/mholt/caddy-ratelimit

FROM caddy:latest

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

WORKDIR /app

COPY /caddy/caddy_start.sh /caddy/Caddyfile .
COPY /flaskapp/static  ./static

RUN chmod a+x caddy_start.sh

RUN caddy fmt --overwrite Caddyfile

ENTRYPOINT ["/bin/sh"]

CMD ["caddy_start.sh"]