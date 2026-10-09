import { escape } from './layout.mjs';
import { glueCopy } from '../content/glue-copy.mjs';
import poster from '../content/ambient-poster.json' with { type:'json' };

// The homepage offers direct manipulation without a surrounding toolbar.
export function molecularAtmosphere(lang,payload) {
  const c=glueCopy[lang];
  return `<div class="molecular-atmosphere" data-protein-viewer data-protein-mode="ambient" data-phase="idle">
    <div class="atmosphere-glow" aria-hidden="true"></div>
    <div class="atmosphere-stage"><img class="atmosphere-poster" src="/${poster.file}" alt="${escape(c.caption)}" width="${poster.width}" height="${poster.height}" fetchpriority="high"><div class="atmosphere-canvas" data-protein-canvas tabindex="-1" role="img" aria-disabled="true" aria-label="${escape(c.title)}" aria-describedby="molecular-gesture-help"></div></div>
    <p class="atmosphere-hint" data-ambient-hint hidden><span class="gesture-mouse">${escape(c.gestureHint)}</span><span class="gesture-touch">${escape(c.gestureTouch)}</span></p><span class="visually-hidden" id="molecular-gesture-help">${escape(c.gestureKeyboard)}</span>
    <p class="atmosphere-status" data-ambient-status role="status" hidden>${escape(c.ambientUnavailable)}</p>
    <script type="application/json" data-protein-data>${payload}</script>
  </div>`;
}
