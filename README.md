# X-Science website

A public portfolio for scientific software and research agents built by Victor Xu. The website has 42 indexable pages: a home page and six product pages in Chinese, English, Japanese, German, French and Korean. It does not run the promoted scientific applications or accept research data.

## Run and maintain

Node.js 22 or newer is the only runtime dependency. No package installation is required.

```powershell
node scripts/build.mjs
node scripts/verify.mjs
node scripts/preview.mjs
```

Open the printed loopback URL. Stop the preview with Ctrl+C. `src/content/products.mjs` is the authoritative product catalog. `src/content/locales.mjs` defines the six routes; shared copy and product translations are modular dictionaries under `src/content/`. A language change preserves the current product, and every page exposes all six `hreflang` alternatives. Missing translations fail verification rather than silently falling back. Templates and styles are separated by responsibility. Links, native language menus and product pages remain usable without JavaScript; JavaScript enhances filters and mobile navigation.

Product facts were reviewed against public GitHub READMEs and release metadata on 2026-10-08. Pins record that reviewed state; links to installation guides use the maintained main branch. Recheck the public source and release assets before changing a product claim, version, environment or download link. The X-Synth README identifies ASKCOS as its currently integrated route-generation engine. Private repositories and the upstream MarkushGrapher fork are excluded from the collection.

## Assets

`ASSET-NOTICES.json` records origins, pinned revisions, roles, licenses and SHA-256. Downloaded screenshots are preserved without altering interface text or scientific data. Seven new images were created with the native image-generation tool: one brand hero and six product concepts. Their prompts are in `IMAGE-PROMPTS.json`; their checked-in WebP derivatives total about 570 KB, and original PNGs are delivered in the neighboring `generated-images` folder. All generated images have visible concept labels in each language. Product concepts are generic editorial illustrations, not identified molecules, interface captures or scientific evidence. No remote fonts, analytics, tracking scripts or third-party runtime are loaded.

To restore the three pinned repository images:

```powershell
node scripts/fetch-assets.mjs
node scripts/build.mjs
```

The committed `src/static/assets/social.png` is the website's original sharing visual. Do not replace actual screenshots with generated imagery. Original website code and artwork: copyright 2026 Victor Xu. Reused product assets retain their source licenses; consult the referenced repositories before redistribution.

## Hosting and repository governance

`.openai/hosting.json` binds this checkout to its Sites project and declares `dist/` as the generated static output. Never substitute or regenerate its project ID during an update. Use the Sites skill source helper to synchronize the reviewed source, run any remaining build checks, create a matching archive and deploy a saved version. Credentials belong only in session memory and hidden stdin, never in the repository or commands.

Windows hosting helpers require Git Bash rather than the Windows `bash.exe` WSL launcher. Prepend `C:\Program Files\Git\bin` to the helper process's PATH, and set that process's `TAR_OPTIONS=--force-local` so GNU tar treats Windows drive-letter archive paths as local files. Keep these overrides local to the helper process; do not change global PATH or WSL settings. The native packager still performs its normal source/manifest, file-tree and archive checks.

Allowed root entries: `src`, `scripts`, `.openai`, `.gitignore`, `package.json`, `README.md`, `ASSET-NOTICES.json`, `IMAGE-PROMPTS.json`, and ignored `dist`. Site identity and content belong to this website; original software repositories remain read-only. No database, model runtime or competing implementation is introduced.

The custom domain is `x-science.ai`. DNS records must come from the Sites custom-domain response. Preserve MX, mail TXT and unrelated subdomains. Replacing a registrar parking record is separate from adding certificate or ownership validation records. Verify the domain's native active/TLS state and public HTTPS after propagation.

## Verification and rollback

`node scripts/verify.mjs` checks all 42 affected pages, complete translation dictionaries, metadata, structured data, local links, image alternatives and exclusion of private-repository links. Browser acceptance checks six-language desktop/mobile layouts, language changes that preserve product identity, filters, mobile navigation, console errors and image loading in actual Google Chrome. Test evidence stays outside the source checkout. No tests are run against the promoted software repositories.

Before publication, build from the reviewed source revision, synchronize that exact revision and retain the saved version ID. For a site update, redeploy the previous verified saved version to roll back. DNS changes can be reverted using the pre-change record receipt; do not change nameservers or unrelated records. A successful build or hosted alias does not prove that custom-domain DNS/TLS has become active.
