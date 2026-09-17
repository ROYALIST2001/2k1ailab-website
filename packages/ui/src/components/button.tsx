import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '../lib/cn';

/**
 * The design uses one amber fill at three sizes, plus a pill variant in the
 * header. Centralised here so the hover lift and shadow stay identical
 * everywhere instead of being retyped per call site.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'pill' | 'ghost';

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-[26px] py-[15px] text-[15px]',
  lg: 'px-7 py-[17px] text-base',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'rounded-[10px] bg-accent-fill text-on-accent hover:bg-accent-fill-hover hover:-translate-y-0.5 ' +
    'hover:shadow-[0_16px_32px] hover:shadow-accent-fill/30',
  pill: 'rounded-full bg-accent-fill text-on-accent hover:bg-accent-fill-hover hover:-translate-y-px',
  ghost:
    'rounded-[10px] border border-line-accent text-accent hover:bg-surface-raised ' +
    'hover:-translate-y-0.5',
};

export function buttonStyles({
  size = 'lg',
  variant = 'primary',
  className,
}: {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
} = {}): string {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-3 font-medium',
    'transition-[background-color,transform,box-shadow,color] duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-60',
    sizeStyles[size],
    variantStyles[variant],
    className,
  );
}

type ButtonLinkProps = {
  href: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;

/**
 * Uses next/link for in-app routes and a plain anchor for `mailto:` and
 * external URLs, which next/link does not handle.
 */
export function ButtonLink({
  href,
  size,
  variant,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles({ size, variant, className });
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (!isInternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export function Button({ size, variant, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonStyles({ size, variant, className })} {...props}>
      {children}
    </button>
  );
}

/** The trailing arrow used on every CTA in the design. */
export function ArrowRight() {
  return (
    <span aria-hidden="true" className="inline-block font-mono">
      →
    </span>
  );
}
