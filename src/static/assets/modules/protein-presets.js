// Fixed visual presets; coordinates and deposited structural annotations stay intact.
export const proteinPalette = {
  secondary: { h: '#d59c67', s: '#74adc5', c: '#a7bbc5', 'arrow start': '#74adc5', 'arrow end': '#74adc5', 'tube start': '#d59c67', 'tube end': '#d59c67' },
  chains: ['#74adc5', '#d59c67', '#a6cbd8', '#ebc69a'],
  elements: { carbon: '#909090', nitrogen: '#3050f8', oxygen: '#ff0d0d', sulfur: '#ffff30', iron: '#e06633' },
  light: '#f3f6f8', dark: '#12161b',
};

export const proteinOrientations = {
  '1UBQ': [['x', -18], ['y', 24]],
  '4HHB': [['x', -12], ['y', 18], ['z', -12]],
  '2LYZ': [['x', -14], ['y', -28], ['z', 12]],
};

export const proteinViewerSettings = {
  backgroundColor: proteinPalette.light,
  orthographic: true, disableFog: true,
  antialias: true, upscale: false, cartoonQuality: 10,
  outline: { width: .025, color: '#395262', maxpixels: 1.1 },
};

export function fittingZoom(width, height) {
  // Orthographic half-height is half-width / aspect in the pinned renderer.
  return 1.5 / Math.max(1, width / Math.max(1, height));
}

export function proteinLegend(model, representation, labels) {
  const identifiers = { C: 'carbon', N: 'nitrogen', O: 'oxygen', S: 'sulfur', FE: 'iron' };
  if (representation === 'atoms') return model.elements.map(element => identifiers[element]).map(key => ({ label: labels[key], color: proteinPalette.elements[key] }));
  if (model.chainCount > 1) return model.chainIds.map((chain, i) => ({ label: `${labels.chain} ${chain}`, color: proteinPalette.chains[i] }));
  return ['helix', 'sheet', 'loop'].map((key, i) => ({ label: labels[key], color: proteinPalette.secondary[['h', 's', 'c'][i]] }));
}
