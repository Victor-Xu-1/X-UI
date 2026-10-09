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
Seven fresh images were created with the native image-generation tool: a hero,
five product concepts and a wide editorial visual. Portable prompts and original
hashes are in `IMAGE-PROMPTS.json`; the WebP derivatives total 1,485,804 bytes.
Original PNGs are retained in the neighboring `generated-images-redesign` folder.
Concepts carry translated labels. The genuine X-DDE capture retains its original
pixels, caption, revision and Apache-2.0 notice. Images never stand in for measured
results or live software execution.

Inter 4.1, 3Dmol.js 2.5.5 and Three.js 0.186.1 are served locally, with complete license notices.
The molecular viewer is loaded only when its section enters view. No remote font,
CDN script, analytics or tracking service is requested by the website.

To restore the pinned genuine repository capture:

```powershell
node scripts/fetch-assets.mjs
node scripts/build.mjs
```

The committed `src/static/assets/social.png` is the website's original sharing visual. Do not replace actual screenshots with generated imagery. Original website code and artwork: copyright 2026 Victor Xu. Reused product assets retain their source licenses; consult the referenced repositories before redistribution.

The official X-Science logo was supplied by the user on 2026-10-08. Its original transparent PNG is preserved as `src/static/assets/logo.png`; browser and touch icons are size derivatives. The same asset appears in the header, footer and sharing artwork. The previous provisional X-shaped mark was removed.

## Concept scenes and workflow explanations

Every home and product page has an interactive biomedical concept, with five
distinct presets: connected research, evidence networks, structure space,
synthesis branches and source mapping. Product cards can borrow the same canvas
for a preview. A document owns one persistent Three renderer; switching hosts or
presets disposes the previous owned geometry and preserves static image access.
The procedural membrane, inner folds, source panes and moving signals are
explicitly conceptual. They do not represent experimental coordinates, computed
results, real-time data, live application execution or molecular dynamics.

`cinematic.js` owns activation, loading, controls and visibility. The separately
loaded `cinematic-scene.js` moves one placeholder canvas and sends bounded
commands to one module worker; `cinematic-renderer.js` owns Three in that worker,
and `cinematic-geometry.js` owns finite geometry and its disposal. The exact
official Three ESM pair is pinned in
`vendor/three-0.186.1`; its approximately 417 KB gzip cost is deferred until the
hero enters view or a visitor selects a preview. Main text, actions and generated
posters appear independently. No remote loader or additional framework is used.
The original 93,048-byte CubeUV lighting atlas is prefetched only for an active
scene and verified by exact bytes, dimensions and SHA-256. Its pinned room spec,
linear color/orientation contract and provenance live in
`src/content/scene-environment.json`. Offline prefiltering preserves the material
and removes expensive visitor-side PMREM preparation; parallel shader preparation
finishes before drawing. The optional `node scripts/bake-lighting.mjs <external
output-directory>` generator requires external Chrome, Playwright and Sharp dev
tools (optionally set `X_UI_RUNTIME_NODE_MODULES`); the normal build requires no
package installation. Regeneration never overwrites committed assets and may
vary with GPU FP16 rounding, so recheck the emitted image and its hash.

The scene bounds physical allocation to 1.6 million pixels, DPR to 1.5, and
cadence to 60 draws/second on wide views and 30 on narrow views. Automatic motion stops out of view,
in hidden documents, on user pause or under OS reduced-motion preferences.
Manual drag/arrow-key movement pauses local animation; reset and static-image
controls stay available. A 20-second import/lighting deadline, 25-second worker
command deadline and explicit reload state handle failed or unavailable 3D.
Worker termination stops application work on timeout, context loss or disposal;
it does not promise immediate cancellation of GPU-driver internal work.
Browsers without the worker/WebGL facilities retain the labeled image path.

`motion-policy.js` is the single authority for OS preferences and the saved
site-wide pause choice. Concept scenes, actual-coordinate rotation and CSS flow
traces subscribe to it. The product workflow explorer gives three keyboard
accessible stages, each explaining real starting material, review points and
the official guide. Shared abstract SVG diagrams illustrate these explanations;
the website performs no scientific calculation or uploads. Without JavaScript,
all explanations, images and source links remain available. All controls and
explanations have six complete locale dictionaries.

## Molecular exploration

The home page and X-DDE product page include one persistent 3Dmol viewer per
document. `src/content/structure-provenance.json` owns the three unmodified RCSB
PDB examples, their exact bytes/hashes, experimental resolution and citations.
`structures.mjs` derives the UI catalog; `structure-copy.mjs` owns translated
labels. The local files are 1UBQ (ubiquitin), 4HHB (deoxyhemoglobin) and 2LYZ
(hen egg-white lysozyme). Their coordinates are reference examples, independent
of the promoted applications. Crystallographic waters are hidden; deposited heme
cofactors are displayed. Author chain IDs and chemical element names stay intact.

The adapter uses orthographic projection, deposited secondary-structure records,
moderate cartoon quality, capped outlines and bounded framing. Colors distinguish
secondary structure, author chains or elements; the same palette owns the on-page
and exported legends. Users can rotate, zoom, reset, change representation or
background and download a genuine PNG with PDB identity and legend. Arrow keys
rotate the focused structure; +/− zoom. Automatic rotation pauses offscreen,
in hidden tabs, after manual manipulation and under reduced-motion preferences.

PNG capture reuses the current renderer, caps physical dimensions at 2400 pixels
per edge and limits pixel allocation before adding the attribution footer. It
restores the live canvas and view in `finally`; it never creates another renderer
or regenerates surfaces. The checked-in real-coordinate poster supports no-JS
visits. Surface workers finish before another model/style can mutate their data.
Fetches have a 20-second deadline, verify exact SHA-256 and expose an explicit
error/retry state. WebGL loss uses an explicit source-link/reload path. The pinned
renderer supports OffscreenCanvas, so context checks use its public renderer API.

The managed CSP permits local scripts and `worker-src 'self' blob:` for surface
workers; it does not permit script eval or an external CDN. Preview reads this
same CSP from the managed nginx include. When updating a dependency or PDB file,
review its official source/license, refresh provenance, verify exact bytes and
render the changed representations before deployment. Do not overwrite genuine
coordinates with generated imagery or describe camera rotation as molecular dynamics.

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
generated molecular contracts. The detailed Chrome matrix also covers all nine
structure/representation combinations, unchanged coordinates, full rotation,
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
