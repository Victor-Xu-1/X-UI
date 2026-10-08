export function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const language = document.querySelector('.language-selector');
  if (!toggle || !navigation) return;
  function setNavigation(open) {
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    if (!open && language) language.open = false;
  }
  toggle.addEventListener('click', () => setNavigation(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavigation(false)));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
    if (language?.open) {
      language.open = false;
      language.querySelector('summary').focus();
    } else if (toggle.getAttribute('aria-expanded') === 'true') {
      setNavigation(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (language?.open && !language.contains(event.target)) language.open = false;
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) setNavigation(false);
  });
  matchMedia('(min-width: 961px)').addEventListener('change', event => {
    if (event.matches) setNavigation(false);
  });
}
