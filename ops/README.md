# Existing VPS deployment

The public primary is the overseas host `174.137.49.222`. `x-science.ai` is the
canonical website; `xscience.si` and `xsci.si` redirect to the same brand, preserving
language/product paths. Each domain's `www` name also redirects to the canonical site.
The owner's Beijing host is reserved for a private backup until the owner has
completed ICP filing. Keep its private server inventory outside this repository.
These scripts deploy static website files; they do not deploy the promoted agents.

The public primary uses HTTPS. One trusted certificate covers all six website
names. HTTP entries and HTTPS aliases redirect to `https://x-science.ai`, preserving
paths and queries. The initial bootstrap HTTP template remains available for
first-time ACME setup; current production uses the TLS template.

Before changing a server, inspect its OS, free disk, TCP listeners, active services,
firewall and SELinux status. Retain the baseline locally. Preserve WireGuard on
UDP443, SSH and OpenClaw. Do not reboot, reinstall, reset credentials or flush
firewall rules for a website update. Provider control-panel **Restart** buttons
may reboot the instance even when displayed in an Agent management page.

On the AlmaLinux primary, install nginx from the configured official distribution
repository if missing (`dnf install nginx`). Do not perform a whole-system update.
Download the content-addressed static and operations archives and manifest from
the reviewed GitHub Release. The synchronized Sites preview can be blocked by
Cloudflare on anonymous artifact downloads; do not bypass that challenge. Retain
the exact manifest/SHA-256 receipt and stage the same checked static tree:

```bash
install -d -m 0755 /var/www
python3 ops/release.py --archive /var/lib/x-science/RELEASE.tar.gz \
  --sha256 RECEIPT_SHA256 --root /var/www/x-science --role primary
bash ops/activate.sh tls /var/www/x-science/releases/RELEASE_ID
curl --fail --resolve x-science.ai:443:127.0.0.1 https://x-science.ai/site-info.json
```

The release command rejects wrong hashes, traversal paths, links, duplicate
members, oversized output and incomplete language pages. It retains the downloaded
archive and a timestamped receipt. It refuses nonempty unmanaged directories and
does not delete prior releases. Activation tests nginx before starting or reloading
it; the previous configuration and release link are retained for rollback.

Verify the actual public HTTP response with the domain Host header before changing
the Spaceship apex A records for all three domains to `174.137.49.222`. Set each
`www` website entry to a CNAME for its own apex. Preserve nameservers, mail MX/TXT
and unrelated subdomains. Open only TCP80/TCP443 in the existing firewall if
needed; verify the active zone, update runtime and permanent service rules, and
preserve all other rules without a global reload. Never claim DNS or HTTPS
completion from a localhost response.

For the verified AlmaLinux primary, `python3 ops/persist-web-firewall.py` adds
only the already active website TCP80/TCP443 rule to the existing WireGuard nft
ruleset. It requires the expected include/input-chain marker, rejects conflicting
rules, tests a staged file with `nft -c`, preserves a private backup and replaces
the file atomically. It never restarts nftables, flushes rules or alters the live
tunnel. `scripts/check-firewall.py` tests only this additive transformation.

Issue one ACME certificate covering the three apex names and their three `www`
names only after authoritative DNS and HTTP validation are correct. Use an existing
ACME account when available. A new account requires the
owner to accept the current certificate authority subscriber agreement before
running any `--agree-tos` action. Once the certificate exists, activate `tls` mode.
Use Certbot webroot `/var/lib/x-science/acme`, retain its renewal configuration,
enable the installed renewal timer, and install an nginx configuration-test/reload
deploy hook. Verify renewal with a focused dry run. The TLS template listens only
on TCP443 and does not enable QUIC on the WireGuard UDP port.

Install the repository's scoped renewal hook after successful first issuance:

```bash
install -d -m 0755 /etc/letsencrypt/renewal-hooks/deploy
install -m 0755 ops/renew-nginx.sh /etc/letsencrypt/renewal-hooks/deploy/x-science-nginx
systemctl enable --now certbot-renew.timer
certbot renew --cert-name x-science.ai --dry-run --run-deploy-hooks
```

The hook acts only on the `x-science.ai` certificate lineage. It checks certificate
expiry and nginx configuration before reloading nginx; failures stop the reload.
The dry run keeps the active production certificate and exercises the hook only
after successful staging validation. TLS starts with a one-day HSTS policy on
each covered host; unrelated subdomains and browser preload lists are excluded.

On the Beijing backup, use the same checked archive and stage privately:

```bash
python3 ops/release.py --archive RELEASE.tar.gz --sha256 RECEIPT_SHA256 \
  --root /var/lib/x-science-backup --role backup
```

The backup command stores only private files and starts no listener. Verify its
archive hash, release metadata and the continued availability of existing services.
Do not expose the Beijing copy as a public domain website without filing.

To roll back the primary, call `activate.sh` with the previous verified release
path and current HTTP/TLS mode, then check the deployed `site-info.json` and actual
pages. The history under `/var/lib/x-science/config-history` retains overwritten
site configurations; other nginx site files are never modified by the activator.

## Fingerprinted resource cache

For releases with `asset-manifest.json`, activation runs `publish-assets.py`
before switching the current link. It validates the managed root, real paths,
file names, byte lengths and SHA-256, then atomically appends immutable files to
`/var/www/x-science/shared/assets/build`. A private ownership marker protects the
shared directory. Existing equal bytes are reused; conflicts and symlinks fail.
Old assets are retained for already-open documents and rollback. Do not clean
this directory as part of a routine deployment.

The server serves this directory with explicit MIME types and inherited security
headers. Only fingerprint paths receive long caching; HTML remains `no-cache`.
HTTP/2 runs on TLS TCP443 and does not change WireGuard's UDP443 listener. Focused
publication checks are `python3 scripts/check-asset-store.py`.

The transfer packager normalizes deployment text to Unix LF in an owned temporary
staging directory. Release checks inspect the archive itself for portable shell
line endings, including packages created from a Windows checkout.
