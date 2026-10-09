import { escape } from './layout.mjs';
import { glueCopy } from '../content/glue-copy.mjs';
import poster from '../content/ambient-poster.json' with { type:'json' };

// The homepage owns a decorative, unfocusable scene with no local controls.
export function molecularAtmosphere(lang,payload) {
  const c=glueCopy[lang];
  return `<div class="molecular-atmosphere" data-protein-viewer data-protein-mode="ambient" data-phase="idle" role="img" aria-label="${escape(c.title)}">
    <div class="atmosphere-glow" aria-hidden="true"></div>
    <div class="atmosphere-stage"><img class="atmosphere-poster" src="/${poster.file}" alt="${escape(c.caption)}" width="${poster.width}" height="${poster.height}" fetchpriority="high"><div class="atmosphere-canvas" data-protein-canvas aria-hidden="true"></div></div>
    <p class="atmosphere-status" data-ambient-status role="status" hidden>${escape(c.ambientUnavailable)}</p>
    <script type="application/json" data-protein-data>${payload}</script>
  </div>`;
}
