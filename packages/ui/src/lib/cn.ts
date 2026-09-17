/**
 * Conditional className joiner.
 *
 * Deliberately dependency-free: this design system has no conflicting-utility
 * problem that would justify clsx + tailwind-merge. If variants grow to the
 * point where classes genuinely conflict, swap the body for
 * `twMerge(clsx(...))` and every call site keeps working unchanged.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
