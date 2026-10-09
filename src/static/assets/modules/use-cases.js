import { enhanceTabset } from './tabset.js';
export function initUseCases() {
  document.querySelectorAll('[data-use-cases]').forEach(root=>{
    enhanceTabset(root.querySelector('[data-use-case-list]'),[...root.querySelectorAll('[data-use-case-tab]')],[...root.querySelectorAll('[data-use-case-panel]')]);
    root.classList.add('has-enhanced-tabs');
  });
}
