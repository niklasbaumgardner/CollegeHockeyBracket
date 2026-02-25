#!/bin/sh

set -euo pipefail

# for backwards compatibility, seperates host and port from url
export APP_DOMAIN=${APP_DOMAIN}
export APP2_DOMAIN=${APP2_DOMAIN}
export APP_PORT=${APP_PORT}
export APP2_PORT=${APP2_PORT}

# strip https:// or https:// from domain if necessary
APP_DOMAIN=${APP_DOMAIN##*://}
APP2_DOMAIN=${APP2_DOMAIN##*://}

echo using app: ${APP_DOMAIN} with port: ${APP_PORT} and ${APP2_DOMAIN} with port: ${APP2_PORT}, listening on ${PORT}

exec caddy run --config Caddyfile
