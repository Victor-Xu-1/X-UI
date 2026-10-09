// Shared keyboard/selection contract for meaningful, progressively enhanced tabs.
export function enhanceTabset(list,tabs,panels) {
  if(!list||tabs.length!==panels.length||!tabs.length)throw new Error('Invalid tabset');
  list.setAttribute('role','tablist');
  panels.forEach(panel=>{panel.setAttribute('role','tabpanel');panel.tabIndex=0;});
  function select(index,focus=false) {
    tabs.forEach((tab,i)=>{
      const active=i===index;
      tab.setAttribute('role','tab');tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;
      panels[i].hidden=!active;tab.closest('.workflow-step')?.classList.toggle('stage-active',active);
    });
    list.dataset.activeTab=String(index);
    if(focus)tabs[index].focus({preventScroll:true});
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();select(index);});
    tab.addEventListener('keydown',event=>{
      const indices={ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1,' ':index};
      if(!(event.key in indices))return;event.preventDefault();select(indices[event.key],true);
    });
  });
  select(0);
}
