import * as T from '../vendor/three-0.186.1/three.module.js';

const amber = 0xff9451;
const cyan = 0x60d9de;
const blue = 0x5a87e5;
const vector = (point) => new T.Vector3(...point);
const presets = {
  'x-science': [[0, 0, 0, 1.05], [-1.7, .8, 0, .58], [1.6, .9, -.3, .7], [.85, -1.45, .4, .62], [-1.3, -1.2, -.3, .52]],
  'x-pharma': [[-1.3, .95, -.3, .6], [0, .5, .4, .72], [1.6, 1, -.4, .55], [-1.7, -.9, .2, .55], [.2, -1.1, -.1, .8], [1.8, -.9, .2, .46]],
  'x-dde': [[0, 0, 0, 1.45], [1.55, -.7, .75, .38]],
  'x-synth': [[-1.8, 0, 0, .7], [-.25, .95, -.25, .57], [1.35, 1.65, .1, .5], [1.6, .35, -.1, .48], [-.15, -1.1, .3, .55], [1.5, -1.6, 0, .47]],
  'x-patentsar': [[-1.6, .9, -.35, .68], [0, .95, .5, .55], [1.6, .8, -.2, .65], [-1.25, -1.2, .3, .55], [.4, -1.05, -.2, .72], [1.8, -.7, .25, .38]],
};
const edges = {
  'x-science': [[0,1],[0,2],[0,3],[0,4],[1,2],[3,4]],
  'x-pharma': [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[1,5]],
  'x-dde': [[0,1]],
  'x-synth': [[0,1],[1,2],[1,3],[0,4],[4,5]],
  'x-patentsar': [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5]],
};

function membrane(radius, seed) {
  const geometry = new T.SphereGeometry(radius, 52, 36);
  const positions = geometry.attributes.position;
  const p = new T.Vector3();
  for (let i = 0; i < positions.count; i++) {
    p.fromBufferAttribute(positions, i);
    const wave = 1 + .085 * Math.sin(p.x * 4 + seed) * Math.cos(p.y * 3) + .035 * Math.sin(p.z * 7);
    positions.setXYZ(i, p.x * wave, p.y * wave * .88, p.z * wave);
  }
  geometry.computeVertexNormals();
  return geometry;
}
function fibre(points, radius, material, group) {
  const curve = new T.CatmullRomCurve3(points);
  const mesh = new T.Mesh(new T.TubeGeometry(curve, 48, radius, 6, false), material);
  group.add(mesh);
  return curve;
}

// Procedural organelles and relationships express a research theme, never PDB data.
export function createConcept(id) {
  if (!presets[id]) throw new Error('Unknown concept');
  const group = new T.Group();
  const nodes = presets[id];
  const pulses = [];
  const paths = [];
  const shellMaterial = new T.MeshPhysicalMaterial({ color: 0x4fa0ab, metalness: .38, roughness: .14, clearcoat: 1, clearcoatRoughness: .17, transparent: true, opacity: .26, side: T.DoubleSide, depthWrite: false });
  const coreMaterial = new T.MeshStandardMaterial({ color: amber, emissive: 0x542008, emissiveIntensity: .38, metalness: .65, roughness: .2 });
  const fibreMaterial = new T.MeshStandardMaterial({ color: cyan, emissive: 0x16495e, emissiveIntensity: .6, metalness: .55, roughness: .25 });
  const accentMaterial = new T.MeshStandardMaterial({ color: blue, emissive: 0x172c69, emissiveIntensity: .7, metalness: .3, roughness: .35 });
  const pulseMaterial = new T.MeshBasicMaterial({ color: 0xf7bc7d });
  const nucleusGeometry = new T.IcosahedronGeometry(1, 3);
  const pulseGeometry = new T.SphereGeometry(.037, 8, 6);
  nodes.forEach(([x, y, z, radius], i) => {
    const cell = new T.Group(); cell.position.set(x, y, z);
    const shell = new T.Mesh(membrane(radius, i), shellMaterial); cell.add(shell);
    const core = new T.Mesh(nucleusGeometry, coreMaterial); core.scale.setScalar(radius * .39); core.rotation.set(i, .4, .7); cell.add(core);
    // Dense curved strands make the inner body organic without post-processing.
    for (let j = 0; j < (id === 'x-dde' ? 5 : 2); j++) {
      const points = Array.from({ length: 34 }, (_, k) => {
        const a = k / 33 * Math.PI * 4.3 + j * 1.8;
        const r = radius * (.52 + .16 * Math.sin(a * 1.7 + i));
        return new T.Vector3(Math.cos(a) * r, Math.sin(a * .61 + j) * radius * .72, Math.sin(a) * r * .9);
      });
      fibre(points, radius * .028, j % 2 ? accentMaterial : coreMaterial, cell);
    }
    pulses.push({ shell, core, phase: i * 1.1, radius }); group.add(cell);
  });
  edges[id].forEach(([a,b], i) => {
    const start = vector(nodes[a].slice(0,3)); const end = vector(nodes[b].slice(0,3));
    const center = start.clone().lerp(end, .5); center.z += .55 + i % 3 * .2;
    const curve = fibre([start, center, end], id === 'x-synth' ? .035 : .012, id === 'x-synth' ? coreMaterial : fibreMaterial, group);
    const bead = new T.Mesh(pulseGeometry, pulseMaterial); group.add(bead); paths.push({ bead, curve, offset: i / edges[id].length });
  });
  const guideMaterial = new T.MeshBasicMaterial({ color: 0x4ca4b0, transparent: true, opacity: .25, depthWrite: false });
  if (id === 'x-patentsar') {
    // Layered source panes provide a distinct mapping motif, without fake documents.
    for (let i=0;i<3;i++) {
      const pane = new T.Mesh(new T.PlaneGeometry(1.65,3.35), new T.MeshBasicMaterial({color:0x588eaa,side:T.DoubleSide,transparent:true,opacity:.14,depthWrite:false}));
      pane.position.set((i-1)*1.5,0,-.6+i*.2); pane.rotation.y=.28; group.add(pane);
      const outline = new T.BufferGeometry().setFromPoints([[-.825,-1.675,0],[.825,-1.675,0],[.825,1.675,0],[-.825,1.675,0]].map(vector));
      const line = new T.LineLoop(outline,new T.LineBasicMaterial({color:0x73c2d4,transparent:true,opacity:.75})); line.position.copy(pane.position);line.rotation.copy(pane.rotation);group.add(line);
    }
  } else {
    const orbit = new T.Mesh(new T.TorusGeometry(id==='x-dde'?2.1:2.65,.006,5,96),guideMaterial);
    orbit.rotation.set(.4,-.2,.1); group.add(orbit);
    if(id==='x-pharma') { const second=orbit.clone();second.rotation.set(-.6,.7,.3);group.add(second); }
  }
  // A finite field of tiny reference marks adds depth rather than artificial data.
  const points = [];
  for (let i = 0; i < 160; i++) {
    const a = i * 2.399963; const r = 2.6 + (i % 17) / 17 * 1.7;
    points.push(Math.cos(a) * r, Math.sin(a) * r * .72, -1.8 - i % 13 / 8);
  }
  const field = new T.BufferGeometry(); field.setAttribute('position', new T.Float32BufferAttribute(points, 3));
  group.add(new T.Points(field, new T.PointsMaterial({ color: 0x75b1bd, size: .018, transparent: true, opacity: .45, depthWrite: false })));
  function animate(time) {
    pulses.forEach(({ shell, core, phase }) => { shell.scale.setScalar(1 + .012 * Math.sin(time * .6 + phase)); core.rotation.y = time * .07 + phase; });
    paths.forEach(({ bead, curve, offset }) => { bead.position.copy(curve.getPoint((time * .055 + offset) % 1)); });
  }
  function dispose() {
    const geometries = new Set(); const materials = new Set();
    group.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
    group.clear();
  }
  return { group, animate, dispose };
}
