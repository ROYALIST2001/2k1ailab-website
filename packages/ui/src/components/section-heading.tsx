import { cn } from '../lib/cn';

/**
 * The numbered badge that opens each section: a lime square carrying the
 * ordinal beside a small uppercase label, on a black tag ("[01] WHAT WE DO").
 * Echoes the logo tile — black ground, lime square — and is its own dark
 * scope, so it reads the same on a white band as inside a dark tile.
 *
 * Renders a real <h2> so the page keeps a valid heading outline; the large
 * display text inside sections is <h3>.
 */
export function SectionHeading({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'theme-dark bg-surface-deep text-ink border-line shadow-card flex w-fit items-center gap-3 rounded-[12px] border p-1.5 pr-5',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-accent-fill text-on-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] font-mono text-[13px] font-medium"
      >
        {number}
      </span>
      <h2 className="m-0 font-mono text-sm font-medium tracking-[0.12em] uppercase">{label}</h2>
    </div>
  );
}
