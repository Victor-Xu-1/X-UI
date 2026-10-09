# Frontend quality and acceptance

The design objective is the craft expected of Awwwards, Webby Awards and FWA
work. It is an objective for continued review, not an award or certification.
Evaluate content, navigation, visual design, functionality, useful interaction
and the overall experience. Use [the Webby judging criteria](https://www.webbyawards.com/judging-criteria/)
as an external reference; automated checks do not judge creative excellence.

## Page and state matrix

Every matrix row applies to all six languages: English, Chinese, Japanese,
German, French and Korean. This covers 36 indexable pages, plus an English 404.
Default English is served at `/`; the central locale dictionary owns routing.

| Page/module | States to inspect | Evidence required |
| --- | --- | --- |
| Home × 6 | First visit, localized hero, concepts, source links, author/contact | Chrome desktop/mobile captures; factual and visual review |
| Product × 5 × 6 | Hero, audience, environment, license, capabilities, steps, scope, related products | Render each route; inspect long translations and genuine/concept image labels |
| Global navigation | Desktop, mobile closed/open, Escape, outside click, resize | Keyboard and pointer behavior; accessible names and focus |
| Language menu | Six options, current language, Escape, outside click, product-preserving switch | Actual destination URL and document language |
| Catalog | All, each category, search, combined search/filter, Unicode, zero results, reset | Visible products and live count; empty-state recovery; query treated as text |
| Workflow explorer | Four stages, active panel, related links, arrows/Home/End, Tab | Correct independent products, selected state and keyboard focus |
| Image viewer | Loading, loaded, failure, original link, close, Escape, focus wrap/restore | Real image pixels and source caption; controlled failed/delayed requests |
| Product section navigation | Each anchor, active location, sticky header, back to top | Heading remains visible; same product route retained |
| Motion | Reveal, pointer response, reading progress, reduced-motion changes | Real scroll/pointer state; reduced motion and touch remain usable |
| Shared motion preference | OS reduction, user pause/resume, refresh, visible/offscreen/hidden states | Image animation timelines stop; genuine PDB rotation and CSS traces agree; accurate reason labels |
| Biomedical imagery × 6 | Subject relevance, blended edges, loading/error/retry, pause/pointer/offscreen/no JS | Original native provenance; real image pixels and accurate labels; no generated results |
| Product use cases × 5 × 6 | Three problem/benefit/next-step panels, official guide, arrows/Home/End, focus, no JS | Complete localized facts, single shared tab contract; no pretend scientific execution |
| Molecular illustration on home/X-DDE × 6 | Lazy/loading/ready, three generically named forms, ribbon/surface, full rotation, reset/zoom, backgrounds, PNG export, error/retry, unavailable/context loss | Actual WebGL pixels, exact source coordinates and bounded views; no visible target/protein/interaction identity in text, alt, ARIA, labels or exports |
| Molecular motion/export | Visible/offscreen/hidden tab, user pause, reduced-motion changes, keyboard, mobile resize, high DPR | Rotation really stops; control states agree; PNG pixels and generic caption/filename are valid; canvas/view restore exactly |
| Molecular failure/recovery | Script/coordinate request failure, corrupt exact bytes, timeout, async surface work, page hide/return, WebGL loss | Genuine still illustration and explicit recovery; accessible status, disabled controls, bounded requests and intentional retry; no competing renderer |
| No JavaScript | Five products, all workflow stages, native menus and image/source links | Browser context with JavaScript disabled |
| 404 | Missing route, English recovery link, noindex | Actual 404 response and usable return link |

## Review procedure

1. Build and run the page-integrity checks. Missing content, translations, assets
   or route metadata must fail before publication.
2. Inspect the affected modules in actual Google Chrome, at 1440 px and 390 px;
   inspect all six home pages at 320 px and long product text at tablet widths.
3. Test the interactions in the matrix with keyboard and pointer. Include empty,
   error, loading and recovery states when the component has them.
4. Review screenshots for typography, spacing, hierarchy, contrast, framing and
   truthful imagery. Preserve real interface screenshots without altering data.
5. Commit and deploy the exact reviewed source. Repeat the changed user path on
   the public domains and verify version, language, images, HTTPS and redirects.

Every completed optimization round includes production deployment and affected
public-path acceptance. Generated artwork, genuine UI captures and deposited
coordinate renders have distinct provenance. Inspect every meaningful molecular view
for silhouette, form distinction, clipping and representation. Keep scientific
provenance in source manifests, outside the illustrative public UI. Treat
journal-figure quality as a rendering objective, not external
publication acceptance, new experimental evidence or molecular dynamics.

Store timestamped reports, screenshots, deployment receipts and limitations
outside source. Record the exact source revision and environment with evidence.
Passing a local test, GitHub CI or the hosted mirror does not establish VPS TLS,
DNS, private-backup health, scientific validity or an award outcome.

## Implementation ownership

`src/content/` owns facts, translations and locale paths; templates consume them.
`src/static/assets/modules/` owns separate navigation, catalog, workflow, viewer
and motion enhancements. `app.js` initializes these modules. Shared styling is
split by page and interaction responsibility. The website adds no scientific
execution, remote analytics, fake live results or duplicate runtime framework.

The image-based promotional visuals and deposited-coordinate 3Dmol viewer have
separate scientific meanings and share one motion preference. Verify original
image hashes, actual animation timelines, explicit image recovery and genuine molecular state changes. The previous abstract Three path is retired; do not retain a
competing renderer/dependency or relabel concept art as screenshots. Verify that
loading/error states hide stale molecular pixels. Inspect complete
pages and selected workflow/use-case states, not only the default hero. Record
layout, interaction and public-deployment evidence; automated checks do not
establish award judging or untested physical-device performance.

Image placement follows an open, minimal editorial treatment: white page,
unframed original illustrations, calm typography and controls beneath images.
Inspect the real desktop/mobile positions, including error/retry states, to
confirm that controls never obscure the picture and remain usable at 320 px.
Keep decorative movement restrained; functional focus and status must remain explicit. The public 3D illustration must not disclose target, protein or interaction descriptions; preserve provenance in the source manifests. OpenAI's public pages are a design reference,
not a source of copied logos, proprietary assets or product claims.

## Current commercial review contracts

Every product must make its practical problem, benefit and guide action clear.
Audit home, hero, navigation, catalog, use cases, capabilities, scope, related
products, contact and footer across all six languages; inspect long labels and
320 px layouts. Remove dead controls, unused diagrams and construction language.
Keep scope/licensing/source facts that inform a real adoption decision.

The public 3D review checks a purely illustrative display: generic form names,
no target/protein/interaction descriptions, no residue labels, no scientific
parameter panels and no identifying export caption or filename. Source manifests
retain real coordinate provenance. Inspect both representations and full rotation
for clipping; check loading, corrupt bytes, request failure, explicit retry,
unavailable WebGL and pause/visibility changes.
Design improvements follow observed screenshot findings. Automated checks and
self-review do not establish external awards or scientific publication acceptance.
