export const defaultLanguage = 'en';
export const locales = {
  en: { html: 'en', name: 'English', short: 'EN', homeLabel: 'Home', topLabel: 'Back to top' },
  zh: { html: 'zh-CN', name: '简体中文', short: '中文', homeLabel: '首页', topLabel: '返回顶部' },
  ja: { html: 'ja', name: '日本語', short: '日本語', homeLabel: 'ホーム', topLabel: 'ページの先頭へ' },
  de: { html: 'de', name: 'Deutsch', short: 'DE', homeLabel: 'Startseite', topLabel: 'Nach oben' },
  fr: { html: 'fr', name: 'Français', short: 'FR', homeLabel: 'Accueil', topLabel: 'Haut de page' },
  ko: { html: 'ko', name: '한국어', short: '한국어', homeLabel: '홈', topLabel: '맨 위로' },
};
export const languages = Object.keys(locales);
export function languagePath(lang) {
  if (!Object.hasOwn(locales, lang)) throw new Error(`Unsupported language: ${lang}`);
  return lang === defaultLanguage ? '/' : `/${lang}/`;
}
