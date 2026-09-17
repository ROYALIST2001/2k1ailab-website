'use client';

import { Tag, cn, tileStyles } from '@company/ui';
import type { Service } from '@company/domain';
import { useTilt } from '@/hooks/use-tilt';

/**
 * Service card with pointer-tracked tilt and a radial glow that follows the
 * cursor.
 *
 * Each card owns its own tilt state. The design held all six in one shared
 * object, which meant every mousemove over one card re-rendered the other
 * five; per-card state keeps the work proportional to what is actually moving.
 *
 * A Tile (black card on the white band) with tilt handlers and the glow
 * overlay added.
 */
export function ServiceCard({ service }: { service: Service }) {
  const tilt = useTilt(12);

  return (
    <article
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={cn(tileStyles, 'reveal relative overflow-hidden')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: tilt.glow }}
      />
      <div
        style={{ transform: tilt.transform }}
        className="relative p-9 transition-transform duration-150 ease-out [transform-style:preserve-3d]"
      >
        <div aria-hidden="true" className="text-ink-faintest mb-5 font-mono text-[13px]">
          {service.number}
        </div>

        <h3 className="m-0 mb-3.5 text-2xl font-medium tracking-[-0.01em]">{service.title}</h3>

        <p className="text-ink-muted m-0 mb-[22px] text-base leading-[1.55] text-pretty">
          {service.description}
        </p>

        <ul className="flex list-none flex-wrap gap-2 p-0">
          {service.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
