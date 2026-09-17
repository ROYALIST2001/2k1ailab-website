import Image from 'next/image';

import { cn } from '../lib/cn';

/**
 * Production replacement for the design's `<image-slot>` custom element.
 *
 * The original was a drag-and-drop editing affordance from the design tool
 * (image-slot.js) and has no place in a shipped site. This keeps the contract
 * that mattered — fixed aspect box, rounded corners, a caption describing what
 * belongs there — and renders a real optimised <Image> once `src` is set.
 *
 * With no `src` it draws a deliberate placeholder rather than a broken image,
 * so the layout is correct before the photography exists.
 */
export function ImageSlot({
  src,
  alt,
  placeholder,
  className,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 45vw',
}: {
  src?: string;
  /** Required whenever `src` is set — decorative-only slots pass ''. */
  alt?: string;
  /** Caption shown in the empty state. */
  placeholder: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={placeholder}
      className={cn(
        'flex items-center justify-center overflow-hidden',
        'border-line bg-surface/60 border border-dashed',
        className,
      )}
    >
      <span className="flex flex-col items-center gap-3 px-6 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-ink-faintest h-8 w-8"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-ink-faintest font-mono text-[13px]">{placeholder}</span>
      </span>
    </div>
  );
}
