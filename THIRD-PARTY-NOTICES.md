# Asset licensing and provenance

The X-UI website's original source, documentation and original website artwork
are released under the [MIT License](LICENSE), copyright 2026 Victor Xu.
The supplied X-Science logo is included as original brand artwork. The MIT
license does not grant rights to represent another organization as X-Science.

The following unmodified assets retain their source licenses. These notices
do not change the licenses of the scientific applications described by this
website. Full source revisions, paths, roles and SHA-256 hashes are recorded
in [ASSET-NOTICES.json](ASSET-NOTICES.json).

Six native-generated WebP illustrations are labeled conceptual and are not
experimental results or live interface evidence. The named X-DDE screenshot
is no longer distributed. Its original bytes and source notice remain in Git
history; the retained X-DDE license is informational for the promoted software.

| Vendored asset | Official source | Retained license |
| --- | --- | --- |
| `assets/vendor/3dmol-xscience/3Dmol-min.js` | [3Dmol.js, pinned official source](https://github.com/3dmol/3Dmol.js/tree/c26e390544b6388f86e50387cd4565759b4da0df) and verified `3dmol@2.5.5` package | [BSD-3-Clause and incorporated GLmol/Three.js/jQuery notices](licenses/3Dmol-2.5.5-LICENSE.txt), [EDTSurf source notice](licenses/3Dmol-2.5.5-EDTSurf-LICENSE.txt) |
| `assets/fonts/inter-variable.woff2` | [Inter 4.1, pinned official source](https://github.com/rsms/inter/tree/e3a3d4c57d5ecc01453a575621882a384c1995a3) | [SIL Open Font License 1.1](licenses/Inter-4.1-LICENSE.txt) |
| `assets/structures/5FQD.pdb`, `6Q0R.pdb`, `1FAP.pdb` | Unmodified experimental reference coordinates from [RCSB PDB](https://www.rcsb.org/pages/usage-policy) | CC0 1.0; retain PDB IDs, primary citations and provenance |

Full runtime/font notices are also served beside the browser assets. Exact hashes,
official source revisions, file origins and citations are in `ASSET-NOTICES.json`
and its referenced structure manifests. The posters and downloaded PNGs are genuine coordinate renders, separate from generated editorial concepts. Their scientific identity stays in source provenance; public presentation uses generic captions. MIT covers this website's original presentation code and
artwork and does not replace these upstream terms.

The served 3Dmol bundle includes four X-Science studio GLSL shaders. The pinned
upstream bytes and original shaders are build inputs under `src/vendor/3dmol`;
`scripts/build-protein-renderer.mjs` creates the only runtime bundle.
The fork notice is shipped alongside the original upstream licenses.
