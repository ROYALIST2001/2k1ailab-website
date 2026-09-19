import { buildShortNames } from '@/content/what-we-build';

function BuildGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 gap-14">
      {buildShortNames.map((name) => (
        <span
          key={name}
          className="text-ink-dim inline-flex items-center gap-3 font-mono text-sm tracking-[0.08em] whitespace-nowrap uppercase"
        >
          {name}
          <span aria-hidden="true" className="bg-accent inline-block h-1 w-1 rounded-full" />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite ticker of what the company builds, in plain language.
 *
 * The track holds the list twice and translates by exactly -50%, so the second
 * copy lands where the first began and the loop is seamless. Only the first
 * copy is exposed to assistive tech — the duplicate is presentational.
 *
 * The duration is overridden because the shared token's 26s was tuned for a
 * six-item list: the keyframe moves a fixed -50% whatever the width, so a
 * longer list at the same duration scrolls proportionally faster. 70s keeps
 * roughly the original reading speed.
 *
 * The animation is paused under prefers-reduced-motion by the global rule in
 * globals.css, which leaves the list legible rather than mid-scroll.
 */
export function Marquee() {
  return (
    <div className="bg-surface-deep relative overflow-hidden py-5">
      <div className="animate-marquee flex w-max gap-14 [animation-duration:70s]">
        <BuildGroup />
        <BuildGroup hidden />
      </div>
    </div>
  );
}
