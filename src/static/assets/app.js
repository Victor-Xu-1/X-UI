import { initNavigation } from './modules/navigation.js';
import { initCatalog } from './modules/catalog.js';
import { initWorkflow } from './modules/workflow.js';
import { initMotion } from './modules/motion.js';
import { initMolecularLoader } from './modules/molecular-loader.js';
import { initMotionPolicy } from './modules/motion-policy.js';
import { initImageMotion } from './modules/image-motion.js';
import { initUseCases } from './modules/use-cases.js';

document.documentElement.classList.add('has-script');
document.querySelectorAll('[data-script-only]').forEach(element => { element.hidden = false; });
initMotionPolicy();
initNavigation();
initCatalog();
initWorkflow();
initMotion();
initMolecularLoader();
initImageMotion();
initUseCases();
