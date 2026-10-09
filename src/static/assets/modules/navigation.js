import { enter,stopAnimation } from './ui-animation.js';
import { motionAllowed } from './motion-policy.js';
export function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const language = document.querySelector('.language-selector');
  if (!toggle || !navigation) return;
  function setNavigation(open) {
    const changed=navigation.classList.contains('is-open')!==open;
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    if (!open && language) language.open = false;
    if(changed)[...navigation.children].forEach((item,index)=>{stopAnimation(item);if(open)enter(item,{delay:index*25,distance:8,duration:260});});
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
  for(const name of ['pageswap','pagereveal'])addEventListener(name,event=>{if(!motionAllowed())event.viewTransition?.skipTransition();});
}
