/**
 * Runs BEFORE FIRST PAINT (inlined in <head>).
 *
 * Why this exists: capability was previously detected in a useEffect, which runs
 * after hydration. The pinned sections need a tall wrapper (220vh+) to have any
 * scroll travel, and that height can only be known once we know the device is
 * cinematic-capable. Flipping the height post-hydration = layout shift = CLS,
 * which the spec forbids outright.
 *
 * So we decide once, synchronously, before anything is painted, and put the
 * answer on <html> as a class. CSS keys off it; there is no shift, no flash, and
 * the server-rendered markup is the resolved (non-cinematic) composition — which
 * is also exactly what a crawler and a reduced-motion user should get.
 *
 * MUST stay in logical sync with lib/useCapability.ts.
 */
export const CAPABILITY_SCRIPT = `
(function(){
  try {
    var d = document.documentElement;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { d.classList.add('motion-off'); return; }

    var wide = matchMedia('(min-width: 1024px)').matches;
    var fine = matchMedia('(pointer: fine)').matches;
    var c = navigator.connection || {};
    var slow = c.saveData === true ||
      c.effectiveType === 'slow-2g' || c.effectiveType === '2g' || c.effectiveType === '3g';
    var lowMem = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
    var fewCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    if (wide && fine && !slow && !(lowMem && fewCores)) d.classList.add('cinematic');
  } catch (e) {}
})();
`;
