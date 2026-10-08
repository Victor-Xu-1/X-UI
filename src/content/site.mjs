// Public deployment identity. Change to HTTPS only after TLS is enabled and verified.
export const siteOrigin = 'http://x-science.ai';
export const sourceRepository = 'https://github.com/Victor-Xu-1/X-UI';

const origin = new URL(siteOrigin);
if (!['http:', 'https:'].includes(origin.protocol) || origin.hostname !== 'x-science.ai'
    || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error('The website origin must be the canonical X-Science domain');
}
