export const locales = {
  zh: { html: 'zh-CN', name: '简体中文', short: '中文' },
  en: { html: 'en', name: 'English', short: 'EN' },
  ja: { html: 'ja', name: '日本語', short: '日本語' },
  de: { html: 'de', name: 'Deutsch', short: 'DE' },
  fr: { html: 'fr', name: 'Français', short: 'FR' },
  ko: { html: 'ko', name: '한국어', short: '한국어' },
};
export const languages = Object.keys(locales);
export function languagePath(lang) {
  if (!Object.hasOwn(locales, lang)) throw new Error(`Unsupported language: ${lang}`);
  return lang === 'zh' ? '/' : `/${lang}/`;
}
