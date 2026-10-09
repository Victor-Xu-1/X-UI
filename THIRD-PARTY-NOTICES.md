# Asset licensing and provenance

The X-UI website's original source, documentation and original website artwork
are released under the [MIT License](LICENSE), copyright 2026 Victor Xu.
The supplied X-Science logo is included as original brand artwork. The MIT
license does not grant rights to represent another organization as X-Science.

The following unmodified assets retain their source licenses. These notices
do not change the licenses of the scientific applications described by this
website. Full source revisions, paths, roles and SHA-256 hashes are recorded
in [ASSET-NOTICES.json](ASSET-NOTICES.json).

| Asset under `src/static/assets/media/` | Source | License |
| --- | --- | --- |
| `x-dde-structure.jpg` | [X-DDE, pinned public capture](https://github.com/Victor-Xu-1/X-DDE/blob/be94cc2dfcbea1bd09e63a19a4820c7278792733/docs/images/structure-and-pocket.jpg) | [Apache-2.0](licenses/X-DDE-LICENSE.txt) |

The genuine capture is identified in every language. Seven fresh native-generated
WebP illustrations are labeled conceptual; they are not scientific results or
live interface evidence. Prior unused artwork was removed from the current tree
after replacement checks and remains recoverable in Git and prior releases.

| Vendored asset | Official source | Retained license |
| --- | --- | --- |
| `assets/vendor/3dmol-2.5.5/3Dmol-min.js` | [3Dmol.js, pinned official source](https://github.com/3dmol/3Dmol.js/tree/c26e390544b6388f86e50387cd4565759b4da0df) and verified `3dmol@2.5.5` package | [BSD-3-Clause and incorporated GLmol/Three.js/jQuery notices](licenses/3Dmol-2.5.5-LICENSE.txt), [EDTSurf source notice](licenses/3Dmol-2.5.5-EDTSurf-LICENSE.txt) |
| `assets/fonts/inter-variable.woff2` | [Inter 4.1, pinned official source](https://github.com/rsms/inter/tree/e3a3d4c57d5ecc01453a575621882a384c1995a3) | [SIL Open Font License 1.1](licenses/Inter-4.1-LICENSE.txt) |
| `assets/structures/5FQD.pdb`, `6Q0R.pdb`, `1FAP.pdb` | Unmodified experimental reference coordinates from [RCSB PDB](https://www.rcsb.org/pages/usage-policy) | CC0 1.0; retain PDB IDs, primary citations and provenance |

Full runtime/font notices are also served beside the browser assets. Exact hashes,
official source revisions, file origins and citations are in `ASSET-NOTICES.json`
and its referenced structure manifests. The 5FQD poster and downloaded PNGs are
genuine coordinate renders with PDB source identity, separate from the generated
editorial concepts. MIT covers this website's original presentation code and
artwork and does not replace these upstream terms.
