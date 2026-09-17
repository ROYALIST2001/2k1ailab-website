'use client';

import { useEffect } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Fades `.reveal` elements in as they enter the viewport.
 *
 * Ports `componentDidMount` from the design's DCLogic class, including its two
 * fail-safes, both of which matter:
 *
 *  1. Elements are visible in the HTML. The hidden class is applied by JS only
 *     after IntersectionObserver support is confirmed — so if JS never runs,
 *     the content is readable rather than permanently invisible.
 *  2. A 2.2s timer force-reveals everything, covering elements that never
 *     intersect (e.g. laid out off-screen at an unusual viewport size).
 *
 * One shared observer for the whole document, matching the original. Sections
 * opt in with `className="reveal"` and stay Server Components.
 */
export function useScrollReveal(): void {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (elements.length === 0) return;

    elements.forEach((element) => element.classList.add('reveal-hidden'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((element) => observer.observe(element));

    const safety = window.setTimeout(() => {
      elements.forEach((element) => element.classList.remove('reveal-hidden'));
    }, 2200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
      // Leave nothing hidden if this unmounts mid-animation.
      elements.forEach((element) => element.classList.remove('reveal-hidden'));
    };
  }, [reducedMotion]);
}
