'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks `prefers-reduced-motion`.
 *
 * The design exposed a manual `reduceMotion` prop; the OS setting is the more
 * meaningful signal, so the JS-driven effects (tilt, scroll reveal) read this
 * instead. Purely CSS-driven motion is handled by the media query in
 * globals.css — this hook exists for effects CSS can't reach.
 *
 * Starts `false` so server and first client render agree; the effect corrects
 * it before paint. Anything gated on this must be safe for one frame of motion.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
