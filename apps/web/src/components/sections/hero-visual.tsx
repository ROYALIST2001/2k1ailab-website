'use client';

import { ImageSlot } from '@company/ui';
import { useTilt } from '@/hooks/use-tilt';

/**
 * Hero image with cursor-tracked 3D tilt and the slow dashed orbit ring.
 *
 * Client-only because it tracks pointer position; kept as its own island so
 * the rest of the hero stays a Server Component.
 *
 * @param src Optional image. Until one exists the ImageSlot empty state
 *            renders at the same dimensions, so the layout never shifts.
 * @param alt Required whenever `src` is set.
 */
export function HeroVisual({ src, alt = '' }: { src?: string; alt?: string }) {
  // 8deg for the hero, matching the design's separate, gentler hero constant.
  const tilt = useTilt(8, { scaleOnHover: true });

  return (
    <div className="relative [perspective:1000px]">
      <div
        aria-hidden="true"
        className="border-accent-fill/80 animate-spin-slow pointer-events-none absolute inset-[-28px] rounded-full border-2 border-dashed"
      />
      <div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{ transform: tilt.transform }}
        className="shadow-shade/50 relative rounded-[20px] shadow-[0_30px_60px_-20px] transition-transform duration-200 ease-out [transform-style:preserve-3d]"
      >
        {/* Aspect ratio matches the artwork so none of its text is cropped. */}
        <ImageSlot
          src={src}
          alt={alt}
          priority
          placeholder="Drop a product or team photo"
          className="aspect-[2340/2060] w-full rounded-[20px]"
        />
      </div>
    </div>
  );
}
