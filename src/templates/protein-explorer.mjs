import { redesignCopy } from '../content/redesign-copy.mjs';
import { structureCatalog } from '../content/structures.mjs';
import { glueCopy } from '../content/glue-copy.mjs';
import { escape } from './layout.mjs';
import poster from '../content/structure-poster.json' with { type:'json' };

export function proteinExplorer(lang) {
  const c=redesignCopy[lang],g=glueCopy[lang],first=structureCatalog[0];
  const runtimeKeys=['structureLoading','structureReady','pause','spin','structureHint','exportError','cartoon','surface'];
  // Only rendering data enters the page; provenance remains in the source manifest.
  const models=structureCatalog.map(({id,file,bytes,sha256,atomCount,ligand,views,groups,quaternion})=>({id,file,bytes,sha256,atomCount,ligand:Object.fromEntries(Object.entries(ligand).filter(([key])=>key!=='name')),views:{interface:views.interface},groups:groups.map(({chains,color})=>({chains,color})),quaternion}));
  const payload=JSON.stringify({structures:models,copy:{...Object.fromEntries(runtimeKeys.map(key=>[key,c[key]])),structureUnsupported:g.unavailable,structureError:g.unavailable,exportReady:g.exportReady},glue:g}).replaceAll('<','\\u003c');
  const hasPoster=poster.pdbId===first.id;
  return `<div id="structures" class="protein-section" data-protein-viewer data-phase="idle" data-background="light">
    <div class="protein-stage">
      ${hasPoster?`<img class="protein-poster" src="/${poster.file}" alt="${escape(g.caption)}" width="${poster.width}" height="${poster.height}" loading="eager" fetchpriority="high"><span class="protein-poster-note">${escape(g.poster)}</span>`:''}
      <div class="protein-canvas" data-protein-canvas tabindex="0" role="img" aria-label="${escape(g.title)}" aria-describedby="protein-keyboard-hint"></div>
      <div class="protein-status-layer" data-protein-status-layer><div class="protein-loader" aria-hidden="true"></div><p role="status" data-protein-status>${escape(c.structureLoading)}</p><button type="button" class="protein-retry" data-protein-retry hidden>${escape(c.retry)}</button></div>
      <div class="protein-stage-top"><span>${escape(g.caption)}</span></div>
      <p class="protein-export-status" data-protein-export-status role="status" hidden></p>
      <div class="protein-stage-bottom"><p>${escape(c.structureHint)}</p><div class="protein-zoom"><button type="button" data-protein-zoom="in" aria-label="${escape(c.zoomIn)}" disabled>+</button><button type="button" data-protein-zoom="out" aria-label="${escape(c.zoomOut)}" disabled>−</button></div></div>
    </div>
    <fieldset class="protein-controls" aria-label="${escape(c.structureControls)}" disabled data-protein-controls>
      <div class="protein-primary-controls"><label for="protein-select" class="visually-hidden">${escape(g.choose)}</label><select id="protein-select" data-protein-select>${structureCatalog.map((model,index)=>`<option value="${model.id}">${escape(g.forms[index])}</option>`).join('')}</select><button type="button" class="protein-spin" data-protein-spin aria-pressed="false"><span aria-hidden="true">◌</span><span data-spin-label>${escape(c.spin)}</span></button></div>
      <details class="protein-options"><summary>${escape(g.details)}<span aria-hidden="true">+</span></summary><div class="protein-options-inner">
        <div class="representation-group"><span>${escape(c.representationLabel)}</span><div class="representation-buttons" role="group" aria-label="${escape(c.representationLabel)}">${[['cartoon',c.cartoon],['surface',c.surface]].map(([key,label])=>`<button type="button" data-representation="${key}" aria-pressed="${key==='cartoon'}">${escape(label)}</button>`).join('')}</div></div>
        <div class="protein-figure-controls"><button type="button" data-protein-reset>${escape(c.resetView)} ↺</button><button type="button" data-protein-background aria-pressed="true">${escape(c.lightBackground)} ◐</button><button type="button" data-protein-export>${escape(c.exportImage)} ↓</button></div>
      </div></details>
    </fieldset>
    <p class="protein-motion-note" data-protein-motion-note hidden>${escape(g.motionReduced)}</p><span class="visually-hidden" id="protein-keyboard-hint">${escape(c.structureKeyboardHint)}</span><p class="visually-hidden" role="status" data-protein-ready></p>
    <noscript><p class="protein-noscript">${escape(g.noScript)}</p></noscript>
    <script type="application/json" data-protein-data>${payload}</script>
  </div>`;
}
