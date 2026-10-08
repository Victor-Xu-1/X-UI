import { initNavigation } from './modules/navigation.js';
import { initCatalog } from './modules/catalog.js';
import { initWorkflow } from './modules/workflow.js';
import { initImageViewer } from './modules/image-viewer.js';
import { initMotion } from './modules/motion.js';

document.documentElement.classList.add('has-script');
document.querySelectorAll('[data-script-only]').forEach(element => { element.hidden = false; });
initNavigation();
initCatalog();
initWorkflow();
initImageViewer();
initMotion();
