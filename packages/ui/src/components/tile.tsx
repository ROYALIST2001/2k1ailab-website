import { cn } from '../lib/cn';

/**
 * Black card on a white band.
 *
 * Sections on the home page are white with their content in these: rounded
 * tiles in the logo's near-black with a soft shadow. `theme-dark` re-enters
 * the dark token set so everything inside — text ramp, lime accent, borders —
 * resolves for a dark surface regardless of the white band around it.
 *
 * Exposed as a class string too, for cards that need their own element and
 * event handlers (ServiceCard) but should share the look.
 */
export const tileStyles =
  'theme-dark bg-surface-deep text-ink shadow-card border-line rounded-[18px] border';

export function Tile({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(tileStyles, className)}>{children}</div>;
}
