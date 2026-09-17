'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ButtonLink, cn } from '@company/ui';

import { siteConfig } from '@/config/site';

/**
 * Floating sticky header: translucent, inset from the viewport edges with
 * rounded corners so it reads as a bar sitting over the page. The sticky
 * wrapper has zero height, so the header overlays content rather than
 * reserving space — the hero paints right up to the top edge behind it, and
 * every page clears it with its own top padding (see scroll-padding-top in
 * tokens.css for the matching anchor offset). `overflow-hidden` keeps the
 * mobile panel's corners inside the radius.
 *
 * The source design was desktop-only — its nav would overflow below ~900px —
 * so the mobile disclosure menu here is an addition, not a port. Above `md`
 * the layout matches the design exactly.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change, otherwise the panel stays open over the new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes; body scroll locks while the panel covers the viewport.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <div className="sticky top-0 z-50 flow-root h-0">
      <header
        className={cn(
          'border-line mx-4 mt-4 overflow-hidden rounded-[20px] border md:mx-6 md:mt-6',
          'bg-canvas/85 backdrop-blur-[12px]',
        )}
      >
        <div className="flex items-center justify-between gap-6 px-5 py-3.5 md:px-8">
          <Link
            href="/"
            className="text-ink hover:text-ink flex items-center gap-3 text-xl font-semibold tracking-[0.14em]"
          >
            {/* Decorative: the adjacent name is the link's accessible label. */}
            <Image
              src={siteConfig.logo}
              alt=""
              width={48}
              height={48}
              priority
              className="rounded-lg"
            />
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-[22px] font-mono text-sm tracking-[0.02em] whitespace-nowrap md:flex"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink-dim hover:text-ink transition-[color,transform] duration-200 hover:-translate-y-px"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" variant="pill" size="sm" className="font-mono">
              Contact
            </ButtonLink>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="border-line text-ink flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="border-line bg-canvas/95 border-t px-6 py-4 backdrop-blur-[12px] md:hidden"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="border-line/60 text-ink-dim hover:text-ink block border-b py-4 font-mono text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/contact"
              variant="primary"
              size="md"
              className="mt-6 w-full font-mono"
            >
              Contact
            </ButtonLink>
          </nav>
        ) : null}
      </header>
    </div>
  );
}
