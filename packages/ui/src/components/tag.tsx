import { cn } from '../lib/cn';

/** Amber outlined capability pill, used under each service card. */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'border-line-accent rounded-full border px-3.5 py-1.5',
        'text-accent font-mono text-xs whitespace-nowrap',
        className,
      )}
    >
      {children}
    </span>
  );
}
