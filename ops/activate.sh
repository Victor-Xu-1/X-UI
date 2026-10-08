#!/usr/bin/env bash
# Activate only a staged X-Science release, with configuration rollback on error.
set -euo pipefail
mode=${1:?Usage: activate.sh http|tls /var/www/x-science/releases/RELEASE}
release=${2:?A staged release path is required}
[[ "$EUID" -eq 0 ]] || { echo 'Run as root' >&2; exit 1; }
[[ "$mode" == http || "$mode" == tls ]] || exit 1
release=$(realpath -- "$release")
[[ "$release" == /var/www/x-science/releases/* ]] || exit 1
[[ -f "$release/site-info.json" && -f "$release/index.html" ]] || exit 1
[[ -f /var/www/x-science/.x-science-managed.json ]] || exit 1
command -v nginx >/dev/null
source_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
state=/var/lib/x-science/config-history/$(date -u +%Y%m%dT%H%M%SZ)-$$
install -d -m 0700 "$state/previous" "$state/rejected"
targets=(/etc/nginx/conf.d/x-science.conf /etc/nginx/x-science/site-common.conf /etc/nginx/x-science/tls-settings.conf)
sources=("$source_dir/nginx/$mode.conf" "$source_dir/nginx/site-common.conf" "$source_dir/nginx/tls-settings.conf")
for target in "${targets[@]}"; do
    if [[ -e "$target" ]]; then
        IFS= read -r header < "$target"
        [[ "$header" == '# X-Science managed'* ]] || { echo "Unmanaged config: $target" >&2; exit 1; }
        cp -p -- "$target" "$state/previous/$(basename "$target")"
    fi
done
if [[ "$mode" == tls ]]; then
    [[ -r /etc/letsencrypt/live/x-science.ai/fullchain.pem && -r /etc/letsencrypt/live/x-science.ai/privkey.pem ]] || exit 1
fi
previous=$(readlink /var/www/x-science/current || true)
rollback() {
    for target in "${targets[@]}"; do
        name=$(basename "$target")
        if [[ -f "$state/previous/$name" ]]; then
            cp -p -- "$state/previous/$name" "$target"
        elif [[ -e "$target" ]]; then
            mv -- "$target" "$state/rejected/$name"
        fi
    done
    if [[ -n "$previous" ]]; then
        ln -sfn -- "$previous" /var/www/x-science/current.next
        mv -Tf -- /var/www/x-science/current.next /var/www/x-science/current
    elif [[ -L /var/www/x-science/current ]]; then
        mv -- /var/www/x-science/current "$state/rejected/current"
    fi
}
if [[ -e /var/www/x-science/current && ! -L /var/www/x-science/current ]]; then
    echo 'Current release path is not a managed symlink' >&2; exit 1
fi
install -d -m 0755 /etc/nginx/x-science /var/lib/x-science/acme
trap rollback ERR
for index in "${!targets[@]}"; do install -m 0644 "${sources[$index]}" "${targets[$index]}"; done
ln -sfn -- "$release" /var/www/x-science/current.next
mv -Tf -- /var/www/x-science/current.next /var/www/x-science/current
if command -v restorecon >/dev/null; then restorecon -R /var/www/x-science; fi
if ! nginx -t; then rollback; exit 1; fi
if systemctl is-active --quiet nginx; then
    if ! systemctl reload nginx; then rollback; nginx -t && systemctl reload nginx; exit 1; fi
else
    if ! systemctl start nginx; then rollback; exit 1; fi
    systemctl enable nginx
fi
printf 'Activated %s (%s). Previous release: %s\n' "$release" "$mode" "$previous"
trap - ERR
