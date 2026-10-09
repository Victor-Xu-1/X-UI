// Give pending input and loading feedback a render opportunity before model work.
export function yieldForInput(signal) {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    let frame = 0, timer = 0;
    const clean = () => { cancelAnimationFrame(frame); clearTimeout(timer); signal.removeEventListener('abort', abort); document.removeEventListener('visibilitychange', hidden); };
    const finish = () => { clean(); signal.aborted ? reject(signal.reason) : resolve(); };
    const abort = () => { clean(); reject(signal.reason); };
    const task = () => { frame = 0; timer = setTimeout(finish, 0); };
    const hidden = () => { if (document.hidden && frame) { cancelAnimationFrame(frame); task(); } };
    signal.addEventListener('abort', abort, { once: true });
    document.addEventListener('visibilitychange', hidden);
    if (document.hidden) task(); else frame = requestAnimationFrame(task);
  });
}
