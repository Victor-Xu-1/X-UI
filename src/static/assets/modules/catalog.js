const normalize = value => value.normalize('NFKC').toLocaleLowerCase().trim();

export function initCatalog() {
  const search = document.querySelector('#catalog-search');
  if (!search) return;
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('#product-collection [data-product]')];
  const count = document.querySelector('#product-count');
  const empty = document.querySelector('.catalog-empty');
  const index = new Map(cards.map(card => [card, normalize(card.textContent)]));
  let category = 'all';
  function render() {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      card.hidden = (category !== 'all' && card.dataset.category !== category)
        || !terms.every(term => index.get(card).includes(term));
      if (!card.hidden) visible++;
    });
    filters.forEach(button => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    render();
  }));
  search.addEventListener('input', render);
  search.addEventListener('search', render);
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; render(); }
  });
  document.querySelector('[data-reset-catalog]').addEventListener('click', () => {
    category = 'all'; search.value = ''; render(); search.focus({ preventScroll: true });
  });
  render();
}
