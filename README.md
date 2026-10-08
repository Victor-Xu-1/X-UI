# X-UI · X-Science website

A public portfolio for scientific software and research agents built by Victor Xu. The website has 36 indexable pages: a home page and five product pages in Chinese, English, Japanese, German, French and Korean. It does not run the promoted scientific applications or accept research data.

The official source repository is [Victor-Xu-1/X-UI](https://github.com/Victor-Xu-1/X-UI).
Original website code, documentation and artwork are [MIT licensed](LICENSE).
Unmodified reused assets retain their original licenses and attribution; see
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). The promoted software keeps its
own repository's license.

English is the default language: `/` and `/products/.../` serve English. Chinese
uses `/zh/` and `/zh/products/.../`; Japanese, German, French and Korean keep their
own language prefixes. The native language selector preserves the product route.
`src/content/locales.mjs` owns the default-language setting and route mapping. The
VPS redirects legacy `/en/` URLs to their canonical English routes.

The research agent is now **X-Science**, with its canonical source at
`Victor-Xu-1/X-Science` and product pages under `/products/x-science/`.
Nginx redirects the former `synon-biomed` product routes in every language to
the current route, preserving query parameters. Historical asset filenames and
the recorded original image-generation prompts retain their provenance.

The public deployment uses HTTPS with a trusted certificate covering the three
apex names and their three `www` entries. `src/content/site.mjs` owns the public
origin used by canonical links, sharing images, hreflang, robots and the sitemap.
Keep it synchronized with the verified production protocol when rebuilding and
deploying.

## Run and maintain

Node.js 22 or newer is the only runtime dependency. No package installation is required.

```powershell
node scripts/build.mjs
node scripts/verify.mjs
node scripts/preview.mjs
```

Open the printed loopback URL. Stop the preview with Ctrl+C. `src/content/products.mjs` is the authoritative product catalog. `src/content/locales.mjs` defines the six routes; shared copy and product translations are modular dictionaries under `src/content/`. A language change preserves the current product, and every page exposes all six `hreflang` alternatives. Missing translations fail verification rather than silently falling back. Templates and styles are separated by responsibility. Links, native language menus and product pages remain usable without JavaScript. Separate enhancement modules provide combined search/filters, a keyboard-accessible workflow explorer, image viewing with loading/error recovery, product section navigation and motion that honors reduced-motion preferences.

Product facts were reviewed against public GitHub READMEs and release metadata on 2026-10-08. Pins record that reviewed state; links to installation guides use the maintained main branch. Recheck the public source and release assets before changing a product claim, version, environment or download link. The X-Synth README identifies ASKCOS as its currently integrated route-generation engine. Private repositories and the upstream MarkushGrapher fork are excluded from the collection.

## Assets

`ASSET-NOTICES.json` records origins, pinned revisions, roles, licenses and SHA-256. Downloaded screenshots are preserved without altering interface text or scientific data. Six original images were created with the native image-generation tool: one brand hero and five product concepts. Their prompts are in `IMAGE-PROMPTS.json`; their checked-in WebP derivatives total about 470 KB, and original PNGs are delivered in the neighboring `generated-images` folder. All generated images have visible concept labels in each language. Product concepts are generic editorial illustrations, not identified molecules, interface captures or scientific evidence. No remote fonts, analytics, tracking scripts or third-party runtime are loaded.

To restore the two pinned repository images:

```powershell
node scripts/fetch-assets.mjs
node scripts/build.mjs
```

The committed `src/static/assets/social.png` is the website's original sharing visual. Do not replace actual screenshots with generated imagery. Original website code and artwork: copyright 2026 Victor Xu. Reused product assets retain their source licenses; consult the referenced repositories before redistribution.

The official X-Science logo was supplied by the user on 2026-10-08. Its original transparent PNG is preserved as `src/static/assets/logo.png`; browser and touch icons are size derivatives. The same asset appears in the header, footer and sharing artwork. The previous provisional X-shaped mark was removed.

## Hosting and repository governance

`.openai/hosting.json` binds this checkout to its Sites project and declares `dist/` as the generated static output. Never substitute or regenerate its project ID during an update. Use the Sites skill source helper to synchronize the reviewed source, run any remaining build checks, create a matching archive and deploy a saved version. Credentials belong only in session memory and hidden stdin, never in the repository or commands.

Windows hosting helpers require Git Bash rather than the Windows `bash.exe` WSL launcher. Prepend `C:\Program Files\Git\bin` to the helper process's PATH, and set that process's `TAR_OPTIONS=--force-local` so GNU tar treats Windows drive-letter archive paths as local files. Keep these overrides local to the helper process; do not change global PATH or WSL settings. The native packager still performs its normal source/manifest, file-tree and archive checks.

Allowed root entries: `src`, `scripts`, `ops`, `licenses`, `.github`, `.openai`, `.gitignore`, `.gitattributes`, `package.json`, `README.md`, `QUALITY.md`, `LICENSE`, `THIRD-PARTY-NOTICES.md`, `ASSET-NOTICES.json`, `IMAGE-PROMPTS.json`, and ignored `dist`. Site identity and content belong to this website; original software repositories remain read-only. No database, model runtime or competing implementation is introduced.

The production domain is `x-science.ai`. For the user's selected VPS hosting, its A record must point to the verified public web server. The Sites alias remains a preview and deployment-download origin; Sites validation records apply only if that hosting target is selected for the custom domain. Preserve mail MX/TXT and unrelated subdomains. Verify public DNS, the actual server response and HTTPS after propagation.

The owner's additional domains, `xscience.si` and `xsci.si`, are configured as brand entry points that redirect to the canonical site. The shared VPS configuration covers all three apex names and their `www` entries, preserving language and product paths in each redirect. Verify their DNS and actual redirects before declaring the entry points active.

For a VPS deployment, use the public IPv4 address of the verified web server as the domain's A record. `node scripts/package-transfer.mjs` creates a content-addressed, SHA-256-checked archive of the same generated pages, plus `dist/_transfer/manifest.json`; it excludes its own transfer directory. This optional public download is a deployment transport, not another website implementation. The VPS serves the extracted static tree through its own web server. Keep server credentials and runtime data outside source; use a dedicated release directory and atomic current symlink. Preserve existing services and validate the web-server configuration before reloading it.

`ops/README.md` documents the existing two-host setup. `ops/release.py` safely stages primary or private backup releases; `ops/activate.sh` activates only staged primary releases, with nginx validation and configuration rollback. Shared nginx settings live in one include, with explicit HTTP bootstrap and TLS templates.

## Verification and rollback

`node scripts/verify.mjs` checks all 36 affected pages, complete translation dictionaries, metadata, structured data, local links, image alternatives and exclusion of private-repository links. Browser acceptance checks six-language desktop/mobile layouts, language changes that preserve product identity, filters, mobile navigation, console errors and image loading in actual Google Chrome. Test evidence stays outside the source checkout. No tests are run against the promoted software repositories.

[QUALITY.md](QUALITY.md) owns the page/module/state review matrix. The GitHub
workflow checks this website's build, generated pages and deployment archive.
After `node scripts/package-transfer.mjs`, run `python scripts/check-release.py`
for focused staging checks, including English/Chinese routes, the original logo,
unsafe archives, role boundaries and retained-release compatibility. Python 3.9
or newer is needed only for release checks and VPS staging.

Before publication, build from the reviewed source revision, synchronize that exact revision and retain the saved version ID. For a site update, redeploy the previous verified saved version to roll back. DNS changes can be reverted using the pre-change record receipt; do not change nameservers or unrelated records. A successful build or hosted alias does not prove that custom-domain DNS/TLS has become active.
