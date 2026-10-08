export const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const star = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" fill="currentColor"/></svg>';
export const mark = '<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M7 7h8l18 26h-8L7 7Z" fill="currentColor"/><path d="M25 7h8L15 33H7L25 7Z" fill="currentColor"/><circle cx="33" cy="7" r="4" fill="var(--lime)"/></svg>';

export const glyph = (id) => {
  const paths = {
    'synon-biomed': '<path d="M24 38V13m0 17L10 20m14 5 14-10M10 20v-9m28 4V6M24 20 13 8"/><circle cx="24" cy="11" r="3"/><circle cx="10" cy="8" r="3"/><circle cx="38" cy="5" r="3"/>',
    'x-pharma': '<path d="M10 6h22v27H10zM16 13h10M16 19h10M16 25h6M18 33v7h22V13h-8"/>',
    'x-dde': '<ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3"/>',
    'x-synth': '<path d="M24 7v12m0 0L10 30m14-11 14 11M10 30v9m28-9v9"/><circle cx="24" cy="6" r="4"/><circle cx="10" cy="30" r="4"/><circle cx="38" cy="30" r="4"/>',
    'x-patentsar': '<path d="M8 7h23l9 9v25H8zM30 7v10h10M15 25h18M15 32h11"/><path d="m16 16 4-4 4 4-4 4-4-4Z"/>',
    'diffsbdd-workbench': '<path d="M8 23c0-10 7-17 16-17 9 0 16 7 16 17S34 42 24 42 8 34 8 23Z"/><path d="M15 24c0-6 4-11 9-11s9 5 9 11-4 11-9 11-9-5-9-11Z"/><circle cx="24" cy="24" r="3"/>',
  };
  return `<svg class="product-glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[id] || paths['x-dde']}</svg>`;
};
