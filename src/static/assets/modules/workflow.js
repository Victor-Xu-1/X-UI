export function initWorkflow() {
  const explorer = document.querySelector('[data-workflow]');
  if (!explorer) return;
  const tabs = [...explorer.querySelectorAll('[data-stage]')];
  const panels = [...explorer.querySelectorAll('[data-stage-panel]')];
  explorer.querySelector('[data-stage-list]').setAttribute('role', 'tablist');
  explorer.querySelectorAll('.workflow-step').forEach(step => step.setAttribute('role', 'presentation'));
  explorer.querySelectorAll('.step-products').forEach(element => { element.hidden = true; });
  panels.forEach(panel => { panel.setAttribute('role', 'tabpanel'); panel.tabIndex = 0; });
  function select(index, focus = false) {
    tabs.forEach((tab, i) => {
      const selected = index === i;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.closest('.workflow-step').classList.toggle('stage-active', selected);
      panels[i].hidden = !selected;
    });
    if (focus) tabs[index].focus({ preventScroll: true });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', event => { event.preventDefault(); select(index); });
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else if (event.key !== ' ' && event.key !== 'Enter') return;
      event.preventDefault(); select(next, true);
    });
  });
  select(0);
}
