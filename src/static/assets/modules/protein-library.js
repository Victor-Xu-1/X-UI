// Load the reviewed, locally served 3Dmol build only when a viewer is requested.
let pending;
export async function loadProteinLibrary() {
  if (window.$3Dmol?.createViewer) return window.$3Dmol;
  if (!pending) {
    pending = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const deadline = setTimeout(() => { script.remove(); reject(new Error('library_timeout')); }, 20_000);
      script.src = '/assets/vendor/3dmol-2.5.5/3Dmol-min.js';
      script.async = true;
      script.onload = () => {
        clearTimeout(deadline);
        if (window.$3Dmol?.createViewer) resolve(window.$3Dmol);
        else { script.remove(); reject(new Error('library_unavailable')); }
      };
      script.onerror = () => { clearTimeout(deadline); script.remove(); reject(new Error('library_load_failed')); };
      document.head.append(script);
    }).catch(error => { pending = undefined; throw error; });
  }
  return pending;
}
