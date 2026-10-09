// Abstract explanatory diagrams. Nodes are stages, never compounds or results.
const patterns = {
  research: { points: [[38,95],[235,90],[435,75]], path: 'M38 95C105 15 172 15 235 90S368 165 435 75' },
  'x-science': { points: [[58,125],[240,62],[421,140]], path: 'M58 125C96 34 185 16 240 62S382 50 421 140M58 125C152 200 340 209 421 140' },
  'x-pharma': { points: [[60,65],[241,138],[420,65]], path: 'M60 65C133 0 170 145 241 138S352 0 420 65M60 65C132 179 342 200 420 65' },
  'x-dde': { points: [[55,105],[242,105],[420,105]], path: 'M55 105C95 36 164 179 242 105S345 21 420 105' },
  'x-synth': { points: [[60,105],[240,105],[420,52],[420,172]], path: 'M60 105H240C300 105 345 52 420 52M240 105C305 105 345 172 420 172' },
  'x-patentsar': { points: [[72,99],[240,99],[408,99]], path: 'M72 99H240H408', panes: true },
};

export function workflowMap(index, theme = 'research') {
  const pattern = patterns[theme];
  if (!pattern) throw new Error('Unknown workflow diagram');
  const gradientId = `flow-${theme}-${index}`;
  const active = index % 3;
  return `<svg class="flow-map" viewBox="0 0 480 230" aria-hidden="true" data-motion-visual>
    <defs><linearGradient id="${gradientId}"><stop stop-color="#72d6d8"/><stop offset="1" stop-color="#ffac76"/></linearGradient></defs>
    ${pattern.panes ? pattern.points.map(([x]) => `<rect class="flow-pane" x="${x-45}" y="31" width="90" height="128" rx="5"/><path class="flow-guide" d="M${x-26} 58H${x+26}M${x-26} 72H${x+14}M${x-26} 135H${x+26}"/>`).join('') : ''}
    <path class="flow-base" d="${pattern.path}"/><path class="flow-trace" d="${pattern.path}" stroke="url(#${gradientId})"/>
    ${pattern.points.map(([x,y],i) => `<circle class="flow-halo" cx="${x}" cy="${y}" r="${i === active ? 27 : 18}"/><circle class="flow-core" cx="${x}" cy="${y}" r="${i === active ? 10 : 6}"/><text x="${x}" y="${y+43}" text-anchor="middle">0${Math.min(i+1,3)}</text>`).join('')}
    <path class="flow-guide" d="M0 215H480M10 0V230M470 0V230"/>
  </svg>`;
}
