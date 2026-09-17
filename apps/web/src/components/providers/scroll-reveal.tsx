'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

/**
 * Mounts the shared scroll-reveal observer. Renders nothing.
 *
 * Exists so the sections themselves stay Server Components — they only need to
 * carry `className="reveal"`, not a client boundary.
 */
export function ScrollReveal(): null {
  useScrollReveal();
  return null;
}
