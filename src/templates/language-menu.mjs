import { locales, languages, languagePath } from '../content/locales.mjs';
import { productPath } from '../content/products.mjs';
import { copy } from '../content/copy.mjs';

export function languageMenu(lang, product) {
  return `<details class="language-selector"><summary aria-label="${copy[lang].languageLabel}"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.3"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" stroke="currentColor" stroke-width="1.3"/></svg><span>${locales[lang].short}</span><span class="language-chevron">⌄</span></summary><div class="language-options">${languages.map((target) => `<a class="language-option" data-language-target="${target}" href="${product ? productPath(product, target) : languagePath(target)}" lang="${locales[target].html}" ${target === lang ? 'aria-current="page"' : ''}>${locales[target].name}<span>${target === lang ? '✓' : ''}</span></a>`).join('')}</div></details>`;
}
