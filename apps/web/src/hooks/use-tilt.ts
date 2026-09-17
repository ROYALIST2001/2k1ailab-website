'use client';

import { useCallback, useMemo, useState } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Cursor-tracking 3D tilt with a matching radial glow.
 *
 * Ports `handleTilt` / `resetTilt` from the design's DCLogic class. The design
 * kept one shared state object keyed by card id; here each card owns its own
 * hook instance, which keeps a hovered card from re-rendering its five
 * siblings on every mousemove.
 *
 * @param maxDegrees Peak rotation at the card edges. Design used 12 for the
 *                   service cards and 8 for the hero.
 */
export type TiltState = {
  /** CSS `transform` value. */
  transform: string;
  /** CSS `background` value for the glow overlay, or 'transparent' at rest. */
  glow: string;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
};

type Position = { rotateX: number; rotateY: number; px: number; py: number };

export function useTilt(maxDegrees = 12, options?: { scaleOnHover?: boolean }): TiltState {
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState<Position | null>(null);
  const scaleOnHover = options?.scaleOnHover ?? false;

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      // Guard against a zero-size rect (element hidden mid-interaction), which
      // would otherwise divide by zero and produce NaN in the transform.
      if (rect.width === 0 || rect.height === 0) return;

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      setPosition({
        px,
        py,
        rotateY: (px - 0.5) * maxDegrees,
        rotateX: (0.5 - py) * maxDegrees,
      });
    },
    [maxDegrees, reducedMotion],
  );

  const onMouseLeave = useCallback(() => setPosition(null), []);

  const { transform, glow } = useMemo(() => {
    const perspective = scaleOnHover ? 1000 : 800;

    if (!position) {
      return {
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
        glow: 'transparent',
      };
    }

    const scale = scaleOnHover ? ' scale3d(1.02,1.02,1.02)' : ' translateZ(6px)';

    return {
      transform:
        `perspective(${perspective}px) rotateX(${position.rotateX}deg) ` +
        `rotateY(${position.rotateY}deg)${scale}`,
      glow:
        `radial-gradient(circle at ${position.px * 100}% ${position.py * 100}%, ` +
        `color-mix(in oklab, var(--color-accent-fill) 16%, transparent), transparent 55%)`,
    };
  }, [position, scaleOnHover]);

  return { transform, glow, onMouseMove, onMouseLeave };
}
