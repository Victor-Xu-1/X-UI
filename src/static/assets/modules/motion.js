export function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
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
        if (entry.isIntersecting || reduced.matches) {
          entry.target.classList.remove('will-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 28px 0px' });
    document.querySelectorAll('.section-head, .product-card, .about-grid, .capability, .product-steps li').forEach(element => {
      if (!reduced.matches && element.getBoundingClientRect().top > innerHeight) element.classList.add('will-reveal');
      observer.observe(element);
    });
    reduced.addEventListener('change', () => {
      if (reduced.matches) document.querySelectorAll('.will-reveal').forEach(element => element.classList.remove('will-reveal'));
    });
  }

  const hero = document.querySelector('.hero-visual');
  if (!hero || !matchMedia('(pointer: fine)').matches) return;
  let bounds;
  let pointerFrame = 0;
  let pointer;
  function resetPointer() {
    cancelAnimationFrame(pointerFrame); pointerFrame = 0;
    hero.style.removeProperty('--pointer-x'); hero.style.removeProperty('--pointer-y');
  }
  hero.addEventListener('pointerenter', () => { bounds = hero.getBoundingClientRect(); });
  hero.addEventListener('pointermove', event => {
    if (reduced.matches || !bounds) return;
    pointer = { x: event.clientX, y: event.clientY };
    if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      hero.style.setProperty('--pointer-x', `${(pointer.x - bounds.left - bounds.width / 2) / bounds.width * 14}px`);
      hero.style.setProperty('--pointer-y', `${(pointer.y - bounds.top - bounds.height / 2) / bounds.height * 14}px`);
    });
  });
  hero.addEventListener('pointerleave', resetPointer);
  reduced.addEventListener('change', resetPointer);
}
