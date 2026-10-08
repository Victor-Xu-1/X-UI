import { redesignCopy } from '../content/redesign-copy.mjs';
import { structureCatalog, structureLabels } from '../content/structures.mjs';
import { escape, externalLink } from './layout.mjs';
import { arrow } from './icons.mjs';
import { proteinLegend } from '../static/assets/modules/protein-presets.js';
import poster from '../content/structure-poster.json' with { type: 'json' };

export function proteinExplorer(lang) {
  const c = redesignCopy[lang];
  const labels = structureLabels[lang];
  const first = structureCatalog[0];
  const runtimeKeys = ['structureUnsupported', 'structureError', 'structureLoading', 'structureReady', 'pause', 'spin', 'structureHint', 'exportReady', 'exportError', 'cartoon', 'surface', 'atoms'];
  const runtimeStructures = structureCatalog.map(({ id, names, organism, file, source, atomCount, chainCount, chainIds, elements, resolution, bytes, sha256 }) => ({ id, names: { [lang]: names[lang] }, organism, file, source, atomCount, chainCount, chainIds, elements, resolution, bytes, sha256 }));
  const payload = JSON.stringify({ language: lang, structures: runtimeStructures, copy: Object.fromEntries(runtimeKeys.map(key => [key, c[key]])), labels }).replaceAll('<', '\\u003c');
  return `<section id="structures" class="section protein-section" data-protein-viewer data-phase="idle" data-background="light">
    <div class="container protein-intro"><div><p class="eyebrow">${escape(c.structureEyebrow)}</p><h2>${escape(c.structureTitle)}</h2></div><p>${escape(c.structureText)}</p></div>
    <div class="container protein-workspace">
      <div class="protein-sidebar"><p class="protein-source-label">${escape(c.modelAttribution)}</p>
        <fieldset class="protein-controls" aria-label="${escape(c.structureControls)}" disabled data-protein-controls>
          <label class="protein-select-label" for="protein-select">${escape(c.proteinLabel)}<select id="protein-select" data-protein-select>${structureCatalog.map(model => `<option value="${model.id}">${escape(model.names[lang])} · ${model.id}</option>`).join('')}</select></label>
          <div class="representation-group"><span>${escape(c.representationLabel)}</span><div class="representation-buttons" role="group" aria-label="${escape(c.representationLabel)}">${[['cartoon', c.cartoon], ['surface', c.surface], ['atoms', c.atoms]].map(([key, label]) => `<button type="button" data-representation="${key}" aria-pressed="${key === 'cartoon'}">${escape(label)}</button>`).join('')}</div></div>
          <div class="protein-motion-controls"><button type="button" class="protein-spin" data-protein-spin aria-pressed="false"><span class="spin-symbol" aria-hidden="true">◌</span><span data-spin-label>${escape(c.spin)}</span></button><button type="button" data-protein-reset>${escape(c.resetView)}<span aria-hidden="true">↺</span></button></div>
          <div class="protein-figure-controls"><button type="button" data-protein-background aria-pressed="true">${escape(c.lightBackground)}<span aria-hidden="true">◐</span></button><button type="button" data-protein-export>${escape(c.exportImage)}<span aria-hidden="true">↓</span></button></div>
        </fieldset>
        <div class="protein-identity"><span class="protein-id" data-protein-id>${first.id}</span><h3 data-protein-name>${escape(first.names[lang])}</h3><p data-protein-organism>${first.organism}</p></div>
        <dl class="protein-metrics"><div><dt>${escape(labels.resolution)}</dt><dd data-protein-resolution>${first.resolution.toFixed(2)} Å</dd></div><div><dt>${escape(labels.chains)}</dt><dd data-protein-chains>${first.chainCount}</dd></div><div><dt>${escape(labels.atoms)}</dt><dd data-protein-atoms>${first.atomCount.toLocaleString(lang)}</dd></div></dl>
        <a class="protein-record text-link" data-protein-record href="${first.source}" target="_blank" rel="noopener noreferrer">${escape(c.pdbSource)}${arrow}</a>
      </div>
      <div class="protein-stage"><img class="protein-poster" src="/${poster.file}" alt="${escape(first.names[lang])} · ${first.id} · ${escape(c.cartoon)}" width="${poster.width}" height="${poster.height}" loading="lazy"><div class="protein-canvas" data-protein-canvas tabindex="0" role="img" aria-label="${escape(c.structureTitle)}" aria-describedby="protein-keyboard-hint"></div>
        <div class="protein-status-layer" data-protein-status-layer><div class="protein-loader" aria-hidden="true"></div><p role="status" data-protein-status>${escape(c.structureLoading)}</p><button type="button" class="protein-retry" data-protein-retry hidden>${escape(c.retry)}</button></div>
        <div class="protein-stage-top"><span data-stage-model>${first.id}</span><span>${escape(c.modelAttribution)}</span></div>
        <p class="protein-export-status" data-protein-export-status role="status" hidden></p>
        <div class="protein-legend" data-protein-legend aria-label="${escape(labels.colorLegend)}">${proteinLegend(first, 'cartoon', labels).map(item => `<span><i class="protein-swatch" style="background-color:${item.color}" aria-hidden="true"></i>${escape(item.label)}</span>`).join('')}</div>
        <div class="protein-stage-bottom"><p>${escape(c.structureHint)}</p><div class="protein-zoom"><button type="button" data-protein-zoom="in" aria-label="${escape(c.zoomIn)}" disabled>+</button><button type="button" data-protein-zoom="out" aria-label="${escape(c.zoomOut)}" disabled>−</button></div></div>
      </div>
    </div><div class="container protein-caption"><p>${escape(c.structureScope)}</p><p class="protein-motion-note" data-protein-motion-note hidden>${escape(labels.motionReduced)}</p><span class="visually-hidden" id="protein-keyboard-hint">${escape(c.structureKeyboardHint)}</span><p class="visually-hidden" role="status" data-protein-ready></p></div>
    <noscript><div class="container protein-noscript"><p>${escape(labels.noScript)}</p><div>${structureCatalog.map(model => externalLink(model.source, `${model.names[lang]} · ${model.id}`, 'text-link')).join('')}</div></div></noscript>
    <script type="application/json" data-protein-data>${payload}</script>
  </section>`;
}
