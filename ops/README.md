# Existing VPS deployment

The public primary is the overseas host `174.137.49.222`. `x-science.ai` is the
canonical website; `xscience.si` and `xsci.si` redirect to the same brand, preserving
language/product paths. Each domain's `www` name also redirects to the canonical site.
The Beijing host
`115.190.116.251` stores a private backup until the owner has completed ICP filing.
These scripts deploy static website files; they do not deploy the promoted agents.

Before changing a server, inspect its OS, free disk, TCP listeners, active services,
firewall and SELinux status. Retain the baseline locally. Preserve WireGuard on
UDP443, SSH and OpenClaw. Do not reboot, reinstall, reset credentials or flush
firewall rules for a website update. Provider control-panel **Restart** buttons
may reboot the instance even when displayed in an Agent management page.

On the AlmaLinux primary, install nginx from the configured official distribution
repository if missing (`dnf install nginx`). Do not perform a whole-system update.
Download the content-addressed archive listed by the preview site's
`/_transfer/manifest.json`, retain its exact SHA-256 receipt, and stage it:

```bash
python3 ops/release.py --archive /var/lib/x-science/RELEASE.tar.gz \
  --sha256 RECEIPT_SHA256 --root /var/www/x-science --role primary
bash ops/activate.sh http /var/www/x-science/releases/RELEASE_ID
curl --fail -H 'Host: x-science.ai' http://127.0.0.1/site-info.json
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

Issue one ACME certificate covering the three apex names and their three `www`
names only after authoritative DNS and HTTP validation are correct. Use an existing
ACME account when available. A new account requires the
owner to accept the current certificate authority subscriber agreement before
running any `--agree-tos` action. Once the certificate exists, activate `tls` mode.
Use Certbot webroot `/var/lib/x-science/acme`, retain its renewal configuration,
enable the installed renewal timer, and install an nginx configuration-test/reload
deploy hook. Verify renewal with a focused dry run. The TLS template listens only
on TCP443 and does not enable QUIC on the WireGuard UDP port.

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
