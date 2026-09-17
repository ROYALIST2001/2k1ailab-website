import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '../lib/cn';

/**
 * Form field primitives.
 *
 * The source design had no form styling — it only offered a mailto: link — so
 * these are built from its existing tokens: surface fills, `line` borders, an
 * amber focus ring, monospace labels.
 *
 * Accessibility contract, wired by `Field` and relied on by the forms:
 *   - label is bound to the control via htmlFor/id
 *   - errors are referenced by aria-describedby and announced via role="alert"
 *   - invalid controls set aria-invalid
 */
const controlStyles =
  'w-full rounded-[10px] border bg-surface/70 px-4 py-3 text-base text-ink ' +
  'placeholder:text-ink-faintest transition-colors duration-200 ' +
  'focus:outline-none focus-visible:border-accent focus-visible:ring-2 ' +
  'focus-visible:ring-accent/40';

export function Field({
  id,
  label,
  error,
  hint,
  required = false,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-ink-dim font-mono text-xs tracking-[0.08em] uppercase">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent ml-1">
            *
          </span>
        ) : (
          <span className="text-ink-faintest ml-2 normal-case">(optional)</span>
        )}
      </label>

      {children}

      {hint && !error ? (
        <p id={`${id}-hint`} className="text-ink-faint text-sm">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-accent text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  invalid,
  ...props
}: ComponentPropsWithoutRef<'input'> & { invalid?: boolean }) {
  return (
    <input
      className={cn(controlStyles, invalid ? 'border-accent' : 'border-line', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: ComponentPropsWithoutRef<'textarea'> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(
        controlStyles,
        'min-h-40 resize-y',
        invalid ? 'border-accent' : 'border-line',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: ComponentPropsWithoutRef<'select'> & { invalid?: boolean }) {
  return (
    <select
      className={cn(
        controlStyles,
        'appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10',
        // Inline chevron: avoids shipping an icon file for a single caret.
        "bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path fill='none' stroke='%23a0a5b5' stroke-width='1.5' d='m1 1 5 5 5-5'/></svg>\")]",
        invalid ? 'border-accent' : 'border-line',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * Honeypot field. Visually and programmatically hidden, but still focusable-out
 * of the tab order — bots that fill every input will trip it.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
