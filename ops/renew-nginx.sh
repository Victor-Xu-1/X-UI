#!/usr/bin/env bash
# X-Science managed Certbot deploy hook; leave other certificate lineages alone.
set -euo pipefail
[[ "${RENEWED_LINEAGE:-}" == /etc/letsencrypt/live/x-science.ai ]] || exit 0
openssl x509 -in "$RENEWED_LINEAGE/fullchain.pem" -noout -checkend 0
nginx -t
systemctl reload nginx
