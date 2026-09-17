import type { Metadata } from 'next';

import { ArrowRight, ButtonLink } from '@company/ui';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1180px] flex-col justify-center px-6 pt-36 pb-24 md:px-12">
      <span className="text-accent mb-6 font-mono text-[13px] tracking-[0.1em] uppercase">404</span>
      <h1 className="m-0 mb-5 text-[clamp(2rem,5vw,44px)] font-medium tracking-[-0.025em]">
        We can&rsquo;t find that page.
      </h1>
      <p className="text-ink-muted m-0 mb-10 max-w-[34em] text-lg text-pretty">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/" size="md">
          Back to home
          <ArrowRight />
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost" size="md">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
