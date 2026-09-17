import { siteConfig } from '@/config/site';

function DisciplineGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 gap-14">
      {siteConfig.disciplines.map((discipline) => (
        <span
          key={discipline}
          className="text-ink-dim inline-flex items-center gap-3 font-mono text-sm tracking-[0.08em] whitespace-nowrap uppercase"
        >
          {discipline}
          <span aria-hidden="true" className="bg-accent inline-block h-1 w-1 rounded-full" />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite discipline ticker.
 *
 * The track holds the list twice and translates by exactly -50%, so the second
 * copy lands where the first began and the loop is seamless. Only the first
 * copy is exposed to assistive tech — the duplicate is presentational.
 *
 * The animation is paused under prefers-reduced-motion by the global rule in
 * globals.css, which leaves the list legible rather than mid-scroll.
 */
export function Marquee() {
  return (
    <div className="bg-surface-deep relative overflow-hidden py-5">
      <div className="animate-marquee flex w-max gap-14">
        <DisciplineGroup />
        <DisciplineGroup hidden />
      </div>
    </div>
  );
}
