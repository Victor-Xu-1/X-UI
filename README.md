# X-UI 路 X-Science website

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

Open the printed loopback URL. Stop the preview with Ctrl+C. `src/content/products.mjs` is the authoritative product catalog. `src/content/locales.mjs` defines the six routes; shared copy and product translations are modular dictionaries under `src/content/`. A language change preserves the current product, and every page exposes all six `hreflang` alternatives. Missing translations fail verification rather than silently falling back. Templates and styles are separated by responsibility. Links, native language menus and product pages remain usable without JavaScript. Separate enhancement modules provide combined search/filters, a keyboard-accessible workflow explorer, image loading/error recovery, product section navigation and motion that honors reduced-motion preferences.

Product facts were reviewed against public GitHub READMEs and release metadata on 2026-10-08. Pins record that reviewed state; links to installation guides use the maintained main branch. Recheck the public source and release assets before changing a product claim, version, environment or download link. The X-Synth README identifies ASKCOS as its currently integrated route-generation engine. Private repositories and the upstream MarkushGrapher fork are excluded from the collection.

## Assets

`ASSET-NOTICES.json` records origins, pinned revisions, roles, licenses and SHA-256.
Six biomedical editorial images were generated and refined with the native image tool
on 2026-10-09: laboratory context, research evidence, pharmaceutical records,
structural biology, medicinal chemistry and patent comparison. Portable generation
and revision prompts are in `IMAGE-PROMPTS.json`; the WebP delivery assets total
317,326 bytes. Original selected PNGs are retained in the neighboring
`generated-images-biomedical` folder.
Concepts carry translated labels and do not represent measured results or live
software execution. The former named research screenshot, its fetch helper and
unused lightbox were retired from distribution; their unmodified originals and
license context remain recoverable in Git history. Public marketing copy,
captions, placeholders, metadata and accessibility labels omit target/disease
terminology and named research examples in all six languages.

The committed social image remains original X-Science sharing artwork.

The official X-Science logo was supplied by the user on 2026-10-08. Its original transparent PNG is preserved as `src/static/assets/logo.png`; browser and touch icons are size derivatives. The same asset appears in the header, footer and sharing artwork. The previous provisional X-shaped mark was removed.

## Commercial content and motion

The home page and each product describe practical research problems, useful
outputs and a next step into the official guide. The five source revisions,
licenses and source revisions remain pinned in products.mjs. Three
six-language use cases per product are owned by commercial-copy.mjs and its
locale modules. tabset.js supplies the shared keyboard contract for product
cases and the home workflow explorer. Selectors explain use; they do not run
scientific software or upload research data.

Six meaningful biomedical illustrations use pale page-compatible backgrounds,
soft CSS edge masks and slow image/pointer/light motion. Deposited-coordinate renders remain unmasked. image-experience.mjs
and image-motion.js own one image enhancement path with explicit error/retry.
The global motion-policy.js persists pause and respects system reduced motion;
image movement and protein rotation stop offscreen and in hidden documents.
Navigation, section reveals, use-case changes, focus and navigation have
purposeful motion without replacing functional states. The retired gallery,
abstract node diagrams and previous standalone Three implementation remain
recoverable in Git history, with no competing active implementation.

## Molecular presentation

Home and X-DDE each own one persistent 3Dmol.js 2.5.5 renderer with the X-Science studio shader fork, sharing
ProteinScene and the same bounded, hash-verified coordinate loader. Scientific
identity, immutable source bytes and upstream citations belong to
structure-provenance.json, not the public marketing presentation.

The homepage has a larger, directly manipulable molecular illustration without
surrounding button panels. Blue and gold ribbons, a translucent envelope and
view-dependent studio highlights follow the supplied visual reference. The model
and genuine poster are selected by ambient-poster.json; a white studio background
blends into the page through a soft outer mask.

Native 3Dmol handlers own drag and pinch through the documented custom-handler
hook. molecular-gestures.js owns a single standard-delta wheel path, keyboard
rotation/zoom/reset and double-click or double-tap reset. No competing native wheel
handler is installed for this scene. Distance limits keep zoom between 0.7x and
2.4x the fitted size. During input and for 1.8 seconds afterward, automatic rotation
pauses; global/system motion policy, visibility and offscreen state remain the
final authority. A chosen view survives responsive resize; reset restores framing.

The initial fit reserves room for rotation. Localized hints distinguish mouse and
touch input, with keyboard instructions available to assistive technology. Before
ready, or after a renderer failure, the canvas is unfocusable and the genuine
poster remains visible. Failure exposes a short status and page-refresh recovery.

X-DDE retains its generic three-form selector, ribbon/surface controls, zoom,
background and actual PNG export. It has no public biological identity or
interaction annotations. Exports carry only a generic caption and brand. Both
modes use unmodified coordinates; camera motion is visual illustration, not
molecular dynamics or an experimental product result.

The immutable coordinate files retain source records. Parser and selection
counts, exact byte length and SHA-256 are checked before rendering. Coordinate
fetches have a 20-second deadline and 8 MiB ceiling; surface work has a 30-second
deadline. Nginx serves chemical/x-pdb with gzip. Static posters are actual renders
of the corresponding presentation, recorded in structure-poster.json and
ambient-poster.json. The original coordinate and license authority is unchanged.

The renderer fork is limited to four reviewable GLSL sources under src/vendor/3dmol.
The build verifies the pinned upstream bundle and shader hashes and replaces
each original shader literal exactly once. It emits one runtime bundle, with no
runtime source patches or second renderer. See the vendor notice for derivation
and material semantics. Both molecular consumers use protein-material.js.

## Motion and navigation architecture

`motion-policy.js` owns the persisted pause preference and OS reduced-motion
setting. `ui-animation.js` owns interruptible Web Animations and measured-height
transitions; cancellation, blur, page hide and viewport changes settle to the
real DOM state. No animation owns business selection or keeps a hidden clone.
`reveal-motion.js` sequences first entrances, `catalog-motion.js` reflows the real
filtered cards, and `active-marker.js` measures selection and section underlines.
The old CSS reveal and tab-panel animations have been retired.

`tabset.js` is the single keyboard, ARIA and hash authority for workflow and use
case tabs. Direct panel hashes restore selection; clicks add history entries,
arrow/Home/End keys replace the current entry, and browser back/forward restores
the corresponding panel. Entering a panel with the keyboard settles ancestor
animations so focused links remain readable during a height change.

Same-origin document navigation uses the browser View Transition API where
supported; links retain their ordinary URLs and navigation behavior. The main
module is render-blocking to initialize motion policy and the `pagereveal`
listener before the first render. This prevents an incoming-document opt-in race;
it does not wait for molecular data or generated artwork. Paused/reduced motion
skips the transition, and navigation remains usable without JavaScript.

## Hosting and repository governance

`.openai/hosting.json` binds this checkout to its Sites project and declares `dist/` as the generated static output. Never substitute or regenerate its project ID during an update. Production releases use the GitHub release archives and existing VPS workflow below. The historic Sites binding is retained as metadata; it is not a production publishing dependency. Credentials belong only in session memory and hidden stdin, never in the repository or commands.

Windows hosting helpers require Git Bash rather than the Windows `bash.exe` WSL launcher. Prepend `C:\Program Files\Git\bin` to the helper process's PATH, and set that process's `TAR_OPTIONS=--force-local` so GNU tar treats Windows drive-letter archive paths as local files. Keep these overrides local to the helper process; do not change global PATH or WSL settings. The native packager still performs its normal source/manifest, file-tree and archive checks.

Allowed root entries: `src`, `scripts`, `ops`, `licenses`, `.github`, `.openai`, `.gitignore`, `.gitattributes`, `package.json`, `README.md`, `QUALITY.md`, `LICENSE`, `THIRD-PARTY-NOTICES.md`, `ASSET-NOTICES.json`, `IMAGE-PROMPTS.json`, and ignored `dist`. Site identity and content belong to this website; original software repositories remain read-only. No database, model runtime or competing implementation is introduced.

The production domain is `x-science.ai`. Its selected VPS A record points to the
verified web server. The historic Sites project is currently unavailable to the connected account and is not asserted to be a synchronized preview.
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
