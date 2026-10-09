import { initReveals } from './reveal-motion.js';
import { activeMarker } from './active-marker.js';
export function initMotion() {
  const progress = document.querySelector('.reading-progress');
  const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
  const marker=sectionLinks.length?activeMarker(sectionLinks[0].parentElement):null;
  let active=-2;
  let frame = 0;
  function updateScroll() {
    frame = 0;
    const distance = document.documentElement.scrollHeight - innerHeight;
    const position = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
    progress?.style.setProperty('--progress', String(position));
    let current = -1;
    sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= 180) current = i; });
    sectionLinks.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if(current!==active){marker?.(sectionLinks[current],active!==-2);active=current;}
  }
  function scheduleScroll() { if (!frame) frame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll, { passive: true });
  updateScroll();

  initReveals();
}
