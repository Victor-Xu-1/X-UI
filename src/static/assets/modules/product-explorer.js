export function initProductExplorer() {
  const root = document.querySelector('[data-product-explorer]');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-product-tab]')];
  const panels = [...root.querySelectorAll('[data-product-panel]')];
  root.querySelector('[data-product-tablist]').setAttribute('role', 'tablist');
  panels.forEach(panel => { panel.setAttribute('role', 'tabpanel'); panel.tabIndex = 0; });
  function select(index, focus = false) {
    tabs.forEach((tab,i) => {
      tab.setAttribute('role', 'tab'); tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus({ preventScroll: true });
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', event => { event.preventDefault(); select(index); });
    tab.addEventListener('keydown', event => {
      const keys = { ArrowRight: (index+1)%tabs.length, ArrowLeft: (index+tabs.length-1)%tabs.length, Home: 0, End: tabs.length-1, ' ': index, Enter: index };
      if (!(event.key in keys)) return;
      event.preventDefault(); select(keys[event.key], true);
    });
  });
  select(0);
}
