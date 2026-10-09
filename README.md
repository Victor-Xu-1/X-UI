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
the current route, preserving query parameters. The five-product catalog excludes
DiffSBDD Workbench. Earlier artwork is retained in Git history and prior releases.

The public deployment uses HTTPS with a trusted certificate covering the three
apex names and their three `www` entries. `src/content/site.mjs` owns the public
origin used by canonical links, sharing images, hreflang, robots and the sitemap.
Keep it synchronized with the verified production protocol when rebuilding and
deploying.

## Run and maintain

Node.js 22 or newer builds the static website. No package installation is required.

```powershell
node scripts/build.mjs
node scripts/verify.mjs
node scripts/verify-assets.mjs
node scripts/preview.mjs
```

Open the printed loopback URL. Stop the preview with Ctrl+C. `src/content/products.mjs` is the authoritative product catalog. `src/content/locales.mjs` defines the six routes; shared copy and product translations are modular dictionaries under `src/content/`. A language change preserves the current product, and every page exposes all six `hreflang` alternatives. Missing translations fail verification rather than silently falling back. Templates and styles are separated by responsibility. Links, native language menus and product pages remain usable without JavaScript. Separate enhancement modules provide combined search/filters, a keyboard-accessible workflow explorer, image viewing with loading/error recovery, product section navigation and motion that honors reduced-motion preferences.

Product facts were reviewed against public GitHub READMEs and release metadata on 2026-10-08. Pins record that reviewed state; links to installation guides use the maintained main branch. Recheck the public source and release assets before changing a product claim, version, environment or download link. The X-Synth README identifies ASKCOS as its currently integrated route-generation engine. Private repositories and the upstream MarkushGrapher fork are excluded from the collection.

## Assets

`ASSET-NOTICES.json` records origins, pinned revisions, roles, licenses and SHA-256.
Six biomedical editorial images were generated and refined with the native image tool
on 2026-10-09: laboratory context, research evidence, pharmaceutical records,
structural biology, medicinal chemistry and patent comparison. Portable generation
and revision prompts are in `IMAGE-PROMPTS.json`; the WebP delivery assets total
317,326 bytes. Original selected PNGs are retained in the neighboring
`generated-images-biomedical` folder.
Concepts carry translated labels. The genuine X-DDE capture retains its original
pixels, caption, revision and Apache-2.0 notice. Images never stand in for measured
results or live software execution.

Inter 4.1 and 3Dmol.js 2.5.5 are served locally, with complete license notices.
The molecular viewer is loaded only when its section enters view. No remote font,
CDN script, analytics or tracking service is requested by the website.

To restore the pinned genuine repository capture:

```powershell
node scripts/fetch-assets.mjs
node scripts/build.mjs
```

The committed `src/static/assets/social.png` is the website's original sharing visual. Do not replace actual screenshots with generated imagery. Original website code and artwork: copyright 2026 Victor Xu. Reused product assets retain their source licenses; consult the referenced repositories before redistribution.

The official X-Science logo was supplied by the user on 2026-10-08. Its original transparent PNG is preserved as `src/static/assets/logo.png`; browser and touch icons are size derivatives. The same asset appears in the header, footer and sharing artwork. The previous provisional X-shaped mark was removed.

## Commercial content and motion

The home page and each product describe practical research problems, useful
outputs and a next step into the official guide. The five source revisions,
licenses and genuine capture identities remain pinned in products.mjs. Three
six-language use cases per product are owned by commercial-copy.mjs and its
locale modules. tabset.js supplies the shared keyboard contract for product
cases and the home workflow explorer. Selectors explain use; they do not run
scientific software or upload research data.

Six meaningful biomedical illustrations use pale page-compatible backgrounds,
soft CSS edge masks and slow image/pointer/light motion. Genuine software
captures and deposited-coordinate renders remain unmasked. image-experience.mjs
and image-motion.js own one image enhancement path with explicit error/retry.
The global motion-policy.js persists pause and respects system reduced motion;
image movement and protein rotation stop offscreen and in hidden documents.
Navigation, section reveals, use-case changes, focus and image viewing have
purposeful motion without replacing functional states. The retired gallery,
abstract node diagrams and previous standalone Three implementation remain
recoverable in Git history, with no competing active implementation.

## Molecular exploration

The home and X-DDE hero each embed one persistent 3Dmol.js 2.5.5 renderer in the
white page. structure-provenance.json owns exact RCSB source bytes and scientific
identity. The references are 5FQD (CRBN/CK1α/S-lenalidomide, 2.45 Å), 6Q0R
(split DCAF15/RBM39/E7820, 2.90 Å), and 1FAP (FKBP12/mTOR FRB/rapamycin, 2.70 Å).
The 1FAP example illustrates induced proximity, not ligase-mediated degradation.
No coordinate is generated or moved by the website. Camera rotation is not
molecular dynamics or an experimental result from the promoted products.

The curated selections retain author chains B/C plus LVY B1438 and Zn B1437
for 5FQD; B/C/D plus O6M B302 for 6Q0R; A/B plus RAP A108 for 1FAP.
The public presentation is strictly illustrative: generic form names, ribbon
and translucent-surface styles, rotation, zoom and export. It contains no
target/protein names, interaction descriptions, residue labels, scientific
parameter panels or identifying image captions. Source provenance remains in
this repository for maintenance; unused analysis controls have been removed.

Raw files retain waters, hydrogens and unselected copies/additives. The parser
uses keepH:false and altLoc:A; full parsed counts are 23,544 / 10,249 / 1,727.
The 1FAP raw file has 2,154 atom records including 427 hydrogens. Source and
displayed counts are explicitly distinct. Runtime asserts parser, ligand and
display-selection counts; a bounded 8 MiB fetch ceiling and exact bytes/SHA-256
checks protect these larger source files. Fetches have a 20-second deadline.

One controller serializes representation changes and surface work. Surface
workers have a 30-second readiness deadline; failed worker/context states use
an explicit recovery path. During loading/error, stale coordinate pixels are
hidden. The genuine coordinate poster and explicit retry remain available.
The pinned renderer supports OffscreenCanvas; context checks use its public
renderer API. No second renderer is created by retries or PNG export.

PNG export uses the actual rendered view, bounded high-resolution dimensions,
a localized generic illustration caption and the X-Science brand. It deliberately omits target, protein, residue, interaction and experimental annotations. It restores
the view and canvas in finally. The scientific figure target is a
visual standard; no journal acceptance or new biological evidence is claimed.

## Hosting and repository governance

`.openai/hosting.json` binds this checkout to its Sites project and declares `dist/` as the generated static output. Never substitute or regenerate its project ID during an update. Use the Sites skill source helper to synchronize the reviewed source, run any remaining build checks, create a matching archive and deploy a saved version. Credentials belong only in session memory and hidden stdin, never in the repository or commands.

Windows hosting helpers require Git Bash rather than the Windows `bash.exe` WSL launcher. Prepend `C:\Program Files\Git\bin` to the helper process's PATH, and set that process's `TAR_OPTIONS=--force-local` so GNU tar treats Windows drive-letter archive paths as local files. Keep these overrides local to the helper process; do not change global PATH or WSL settings. The native packager still performs its normal source/manifest, file-tree and archive checks.

Allowed root entries: `src`, `scripts`, `ops`, `licenses`, `.github`, `.openai`, `.gitignore`, `.gitattributes`, `package.json`, `README.md`, `QUALITY.md`, `LICENSE`, `THIRD-PARTY-NOTICES.md`, `ASSET-NOTICES.json`, `IMAGE-PROMPTS.json`, and ignored `dist`. Site identity and content belong to this website; original software repositories remain read-only. No database, model runtime or competing implementation is introduced.

The production domain is `x-science.ai`. Its selected VPS A record points to the
verified web server. The existing Sites alias remains a synchronized preview.
Cloudflare may block anonymous mirror downloads; production transport uses the
same checked content-addressed artifacts published in GitHub Releases. Sites
validation records apply only when Sites is selected for the custom domain.
Preserve mail MX/TXT, nameservers and unrelated subdomains. Verify public DNS,
the actual server response and HTTPS after propagation.

The owner's additional domains, `xscience.si` and `xsci.si`, are configured as brand entry points that redirect to the canonical site. The shared VPS configuration covers all three apex names and their `www` entries, preserving language and product paths in each redirect. Verify their DNS and actual redirects before declaring the entry points active.

For a VPS deployment, use the public IPv4 address of the verified web server as the domain's A record. `node scripts/package-transfer.mjs` creates a content-addressed, SHA-256-checked archive of the same generated pages, plus `dist/_transfer/manifest.json`; it excludes its own transfer directory. This optional public download is a deployment transport, not another website implementation. The VPS serves the extracted static tree through its own web server. Keep server credentials and runtime data outside source; use a dedicated release directory and atomic current symlink. Preserve existing services and validate the web-server configuration before reloading it.

`ops/README.md` documents the existing two-host setup. `ops/release.py` safely stages primary or private backup releases; `ops/activate.sh` activates only staged primary releases, with nginx validation and configuration rollback. Shared nginx settings live in one include, with explicit HTTP bootstrap and TLS templates.

## Verification and rollback

`node scripts/verify.mjs` checks all 36 affected pages, complete translation dictionaries, metadata, structured data, local links, image alternatives and exclusion of private-repository links. Browser acceptance checks six-language desktop/mobile layouts, language changes that preserve product identity, filters, mobile navigation, console errors and image loading in actual Google Chrome. Test evidence stays outside the source checkout. No tests are run against the promoted software repositories.

`node scripts/verify-assets.mjs` checks fresh artwork, complete molecular copy,
exact PDB/vendor/font bytes, served license notices, poster provenance and the
generated molecular contracts. The detailed Chrome matrix also covers all meaningful molecular views, unchanged coordinates, camera rotation,
high-DPR export, loading/failure/retry, context loss and reduced motion.

[QUALITY.md](QUALITY.md) owns the page/module/state review matrix. The GitHub
workflow checks this website's build, generated pages and deployment archive.
After `node scripts/package-transfer.mjs`, run `python scripts/check-release.py`
for focused staging checks, including English/Chinese routes, the original logo,
unsafe archives, role boundaries and retained-release compatibility. Python 3.9
or newer is needed only for release checks and VPS staging.

Before publication, build from the reviewed source revision, synchronize that exact revision and retain the saved version ID. For a site update, redeploy the previous verified saved version to roll back. DNS changes can be reverted using the pre-change record receipt; do not change nameservers or unrelated records. A successful build or hosted alias does not prove that custom-domain DNS/TLS has become active.

Each completed optimization round proceeds through focused checks, GitHub
publication, production deployment and verification of its actual changed
experience on all three domain entry points. A local preview does not complete
an optimization delivery. Prior verified VPS release directories remain available
for rollback; the owner has deferred the Beijing backup for this delivery.

Built HTML uses the package version on asset URLs, and first-party module imports
receive that same version during the build. Vendored code, fonts, images and PDB
bytes remain unmodified. The managed server requires cache revalidation, so a
returning visitor receives the current document and its matching resources after
a normal refresh. Coordinate fetches revalidate before exact SHA-256 checking.
