FROM caddy:builder AS builder
RUN xcaddy build master \
    --with github.com/caddy-dns/cloudflare@latest

FROM caddy
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
