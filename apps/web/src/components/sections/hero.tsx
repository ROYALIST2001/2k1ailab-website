import { ArrowRight, ButtonLink, Tile } from '@company/ui';

import { WhatWeBuild } from '@/components/sections/what-we-build';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section id="top" className="theme-light bg-canvas text-ink relative overflow-hidden">
      {/* Ambient blur orbs. Purely decorative. */}
      <div
        aria-hidden="true"
        className="animate-drift bg-accent-fill/20 pointer-events-none absolute -top-[100px] -left-[90px] h-[380px] w-[380px] rounded-full blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="animate-drift-slow bg-shade/8 pointer-events-none absolute right-[8%] -bottom-[140px] h-[320px] w-[320px] rounded-full blur-[90px]"
      />

      {/* Top padding clears the floating header, which overlays the page. */}
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 px-6 pt-36 pb-20 md:px-12 md:pt-[150px] md:pb-[110px] lg:grid-cols-2">
        <Tile className="relative z-1 p-8 md:p-11">
          <div className="animate-fade-up border-line-accent text-accent mb-8 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[13px] tracking-[0.08em] whitespace-nowrap uppercase">
            <span aria-hidden="true" className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
            Technology partner for your business
          </div>

          <h1 className="animate-fade-up m-0 mb-7 text-[clamp(2.25rem,5vw,56px)] leading-[1.03] font-medium tracking-[-0.03em] text-pretty [animation-delay:0.08s]">
            Technology solutions for your business.
          </h1>

          <p className="animate-fade-up text-ink-muted m-0 mb-11 max-w-[32em] text-xl leading-[1.6] text-pretty [animation-delay:0.16s]">
            Websites and apps, business systems, AI and automation, connected devices and cloud. We
            design it, build it and support it, and you deal directly with the people doing the
            work.
          </p>

          <div className="animate-fade-up flex flex-wrap items-center gap-7 [animation-delay:0.24s]">
            <ButtonLink href="/contact" size="lg">
              Tell us about your project
              <ArrowRight />
            </ButtonLink>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ink-dim hover:text-accent-link font-mono text-sm"
            >
              {siteConfig.email}
            </a>
          </div>
        </Tile>

        <div className="animate-fade-up relative z-1 [animation-delay:0.32s]">
          <WhatWeBuild />
        </div>
      </div>
    </section>
  );
}
