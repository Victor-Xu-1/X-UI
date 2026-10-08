// 3Dmol workers have no public cancellation handle. A failed/late job requires
// a document reload before any model or surface is mutated again.
export async function settleSurface(work, deadlineMs = 30_000) {
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('surface_timeout')), deadlineMs);
  });
  try { return await Promise.race([work, deadline]); }
  finally { clearTimeout(timer); }
}
