import { Tile } from '@company/ui';

import { buildCategories } from '@/content/what-we-build';

/**
 * The hero's right-hand panel: every system the company builds, grouped.
 *
 * Replaced a flat artwork PNG of the same content, so the list is now real
 * text — selectable, searchable and readable by screen readers.
 */
export function WhatWeBuild() {
  return (
    <Tile className="p-8 md:p-10">
      <h2 className="m-0 mb-8 text-lg font-medium tracking-[-0.01em]">What we build</h2>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {buildCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-accent m-0 mb-4 font-mono text-[11px] tracking-[0.14em] uppercase">
              {category.title}
            </h3>
            <ul className="m-0 list-none space-y-2.5 p-0">
              {category.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <span aria-hidden="true" className="bg-accent/70 mt-2 h-1 w-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="border-line-accent text-accent mt-9 mb-0 rounded-xl border px-5 py-3.5 text-[15px]">
        + Any system you need
      </p>

      <p className="text-ink-muted mt-6 mb-0 font-mono text-[11px] tracking-[0.12em] uppercase">
        You have problems. <span className="text-accent">We have solutions.</span>
      </p>
    </Tile>
  );
}
