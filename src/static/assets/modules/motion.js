import { motionAllowed, subscribeMotion } from './motion-policy.js';
export function initMotion() {
  const progress = document.querySelector('.reading-progress');
  const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
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
  }
  function scheduleScroll() { if (!frame) frame = requestAnimationFrame(updateScroll); }
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll, { passive: true });
  updateScroll();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting || !motionAllowed()) {
          entry.target.classList.remove('will-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 28px 0px' });
    document.querySelectorAll('.section-head, .product-card, .about-grid, .capability, .use-case-explorer, .research-intro, .proof-copy, .selection-note-inner, .contact-inner').forEach(element => {
      if (motionAllowed() && element.getBoundingClientRect().top > innerHeight) element.classList.add('will-reveal');
      observer.observe(element);
    });
    subscribeMotion(allowed => {
      if (!allowed) document.querySelectorAll('.will-reveal').forEach(element => element.classList.remove('will-reveal'));
    });
  }
}
