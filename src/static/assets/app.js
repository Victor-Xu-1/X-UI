document.documentElement.classList.add('has-script');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const languageSelector = document.querySelector('.language-selector');

function setNavigation(open) {
  if (!toggle || !navigation) return;
  navigation.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
}
toggle?.addEventListener('click', () => setNavigation(toggle.getAttribute('aria-expanded') !== 'true'));
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setNavigation(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && languageSelector?.open) {
    languageSelector.open = false;
    languageSelector.querySelector('summary').focus();
    return;
  }
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setNavigation(false);
    toggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (languageSelector?.open && !languageSelector.contains(event.target)) languageSelector.open = false;
});

const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-product]')];
const count = document.querySelector('#product-count');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    filters.forEach((button) => {
      const selected = button === filter;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visible += 1;
    });
    if (count) count.textContent = String(visible);
  });
});
