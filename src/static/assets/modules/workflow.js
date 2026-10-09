import { enhanceTabset } from './tabset.js';
export function initWorkflow() {
  const root=document.querySelector('[data-workflow]');
  if(!root)return;
  root.querySelectorAll('.workflow-step').forEach(step=>step.setAttribute('role','presentation'));
  root.querySelectorAll('.step-products').forEach(element=>element.hidden=true);
  enhanceTabset(root.querySelector('[data-stage-list]'),[...root.querySelectorAll('[data-stage]')],[...root.querySelectorAll('[data-stage-panel]')]);
}
