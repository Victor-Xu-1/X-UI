export const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const mark = '<img class="brand-mark" src="/assets/apple-touch-icon.png" width="40" height="40" alt="" aria-hidden="true">';

export const glyph = (id) => {
  if (id === 'x-science') return '<img class="product-glyph" src="/assets/apple-touch-icon.png" width="48" height="48" alt="" aria-hidden="true">';
  const paths = {
    'x-pharma': '<path d="M10 6h22v27H10zM16 13h10M16 19h10M16 25h6M18 33v7h22V13h-8"/>',
    'x-dde': '<ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3"/>',
    'x-synth': '<path d="M24 7v12m0 0L10 30m14-11 14 11M10 30v9m28-9v9"/><circle cx="24" cy="6" r="4"/><circle cx="10" cy="30" r="4"/><circle cx="38" cy="30" r="4"/>',
    'x-patentsar': '<path d="M8 7h23l9 9v25H8zM30 7v10h10M15 25h18M15 32h11"/><path d="m16 16 4-4 4 4-4 4-4-4Z"/>',
  };
  return `<svg class="product-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[id] || paths['x-dde']}</svg>`;
};
