import provenance from './structure-provenance.json' with { type: 'json' };

const names = {
  en: ['Ubiquitin', 'Hemoglobin', 'Lysozyme'],
  zh: ['泛素', '血红蛋白', '溶菌酶'],
  ja: ['ユビキチン', 'ヘモグロビン', 'リゾチーム'],
  de: ['Ubiquitin', 'Hämoglobin', 'Lysozym'],
  fr: ['Ubiquitine', 'Hémoglobine', 'Lysozyme'],
  ko: ['유비퀴틴', '헤모글로빈', '라이소자임'],
};
export { structureLabels } from './structure-copy.mjs';

function resolution(entry) {
  const values = entry.resolution_angstrom;
  if (!Array.isArray(values) || values.length !== 1 || !Number.isFinite(values[0])) throw new Error(`${entry.id}: expected one verified experimental resolution`);
  return values[0];
}
export const structureCatalog = provenance.structures.map(entry => {
  const index = ['1UBQ', '4HHB', '2LYZ'].indexOf(entry.id);
  if (index < 0 || !entry.protein_chains || typeof entry.protein_chains !== 'object') throw new Error('Missing verified structure identity');
  return {
  id: entry.id,
  names: Object.fromEntries(Object.entries(names).map(([language, values]) => [language, values[index]])),
  organism: entry.id === '2LYZ' ? 'Gallus gallus' : 'Homo sapiens',
  file: `/assets/structures/${entry.id}.pdb`,
  source: entry.record_url,
  atomCount: entry.total_atom_records,
  proteinAtoms: entry.atom_records,
  chainCount: Object.keys(entry.protein_chains).length,
  chainIds: Object.keys(entry.protein_chains).sort(),
  elements: entry.displayed_elements,
  resolution: resolution(entry),
  bytes: entry.bytes,
  sha256: entry.sha256,
  citation: entry.primary_citation,
  };
});
