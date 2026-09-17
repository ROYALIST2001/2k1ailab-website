'use client';

import { useEffect } from 'react';

import { Button, ButtonLink } from '@company/ui';

/**
 * Route-level error boundary.
 *
 * Shows a generic message: `error.message` is scrubbed to a digest in
 * production anyway, and surfacing raw errors risks leaking internals.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with your error reporter (Sentry etc.) when one is wired up.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1180px] flex-col justify-center px-6 pt-36 pb-24 md:px-12">
      <span className="text-accent mb-6 font-mono text-[13px] tracking-[0.1em] uppercase">
        Error
      </span>
      <h1 className="m-0 mb-5 text-[clamp(2rem,5vw,44px)] font-medium tracking-[-0.025em]">
        Something went wrong.
      </h1>
      <p className="text-ink-muted m-0 mb-10 max-w-[34em] text-lg text-pretty">
        Sorry — that didn&rsquo;t load. Try again, and if it keeps happening let us know.
      </p>
      {error.digest ? (
        <p className="text-ink-faintest m-0 mb-8 font-mono text-[13px]">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-4">
        <Button type="button" size="md" onClick={reset}>
          Try again
        </Button>
        <ButtonLink href="/contact" variant="ghost" size="md">
          Report a problem
        </ButtonLink>
      </div>
    </div>
  );
}
