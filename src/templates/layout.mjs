import { copy } from '../content/copy.mjs';
import { languagePath, productPath } from '../content/products.mjs';
import { mark, external, arrow } from './icons.mjs';
import { locales, languages, defaultLanguage } from '../content/locales.mjs';
import { languageMenu } from './language-menu.mjs';
import { imageViewer } from './image-viewer.mjs';
import { siteOrigin, sourceRepository } from '../content/site.mjs';
import { motionControl } from './image-experience.mjs';

export const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
export const multiline = (value) => escape(value).replaceAll('\n', '<br>');
export const externalLink = (url, label, classes = '', icon = external) => `<a class="${escape(classes)}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}${icon}</a>`;

export function layout({ lang, body, title, description, path, product }) {
  const c = copy[lang];
  const home = languagePath(lang);
  const alternates = languages.map((target) => `<link rel="alternate" hreflang="${locales[target].html}" href="${siteOrigin}${product ? productPath(product, target) : languagePath(target)}">`).join('');
  const canonical = `${siteOrigin}${path}`;
  const siteTitle = title || c.title;
  const siteDescription = description || c.description;
  const data = { '@context': 'https://schema.org', '@type': product ? 'SoftwareApplication' : 'WebSite', name: product?.name || 'X-Science', url: canonical, description: siteDescription, inLanguage: c.lang };
  if (product) Object.assign(data, { applicationCategory: 'ScienceApplication', license: product.repository + '/blob/main/LICENSE', codeRepository: product.repository, author: { '@type': 'Person', name: 'Victor Xu', url: 'https://github.com/Victor-Xu-1' } });
  return `<!doctype html>
<html lang="${c.lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(siteTitle)}</title><meta name="description" content="${escape(siteDescription)}">
<meta name="theme-color" content="#ffffff"><link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="canonical" href="${canonical}">${alternates}<link rel="alternate" hreflang="x-default" href="${siteOrigin}${product ? productPath(product, defaultLanguage) : languagePath(defaultLanguage)}">
<meta property="og:type" content="website"><meta property="og:title" content="${escape(siteTitle)}"><meta property="og:description" content="${escape(siteDescription)}"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="X-Science"><meta property="og:image" content="${siteOrigin}/assets/social.png"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/styles/base.css"><link rel="stylesheet" href="/assets/styles/home.css"><link rel="stylesheet" href="/assets/styles/product.css">
<link rel="stylesheet" href="/assets/styles/interactions.css">
<link rel="stylesheet" href="/assets/styles/protein.css">
<link rel="stylesheet" href="/assets/styles/experience.css">
<link rel="stylesheet" href="/assets/styles/use-cases.css">
<link rel="stylesheet" href="/assets/styles/responsive.css">
<link rel="stylesheet" href="/assets/styles/editorial.css">
<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>
<script type="module" src="/assets/app.js"></script></head>
<body class="${product ? 'product-page' : 'home-page'}" data-language="${lang}">
<a class="skip-link" href="#main">${c.skip}</a>
<header class="site-header"><div class="container header-inner">
  <div class="reading-progress" aria-hidden="true"></div>
  <a class="brand" href="${home}" aria-label="X-Science ${locales[lang].homeLabel}">${mark}<span>X-Science<span class="brand-dot">.</span></span></a>
  <button class="menu-toggle" type="button" aria-label="${c.menu}" data-open-label="${c.menu}" data-close-label="${c.closeMenu}" aria-expanded="false" aria-controls="main-nav"><span></span><span></span></button>
  <nav id="main-nav" class="main-nav" aria-label="${c.navigationLabel}">
    <a href="${home}#software">${c.nav[0]}</a><a href="${home}#workflow">${c.nav[1]}</a><a href="${home}#about">${c.nav[2]}</a>
    ${languageMenu(lang, product)}${motionControl(lang)}
    ${externalLink('https://github.com/Victor-Xu-1', 'GitHub', 'nav-github')}
  </nav>
</div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="container"><div class="footer-main">
  <div><a class="brand" href="${home}">${mark}<span>X-Science.</span></a><p>${c.footerText}</p></div>
  <div class="footer-links"><a href="${home}#software">${c.footerNav[0]}</a>${externalLink(sourceRepository, 'X-UI · MIT')}${externalLink('https://github.com/Victor-Xu-1', 'GitHub')}${externalLink('https://www.linkedin.com/in/victor-xu-416797427', 'LinkedIn')}</div>
</div><div class="footer-bottom"><span>© 2026 X-Science · Victor Xu</span><span>${c.licenseNote}</span><a href="#main" aria-label="${locales[lang].topLabel}">${arrow}</a></div></div></footer>
${imageViewer(lang)}
</body></html>`;
}
