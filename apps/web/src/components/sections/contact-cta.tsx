import { ArrowRight, ButtonLink } from '@company/ui';
import { siteConfig } from '@/config/site';

/**
 * Closing contact block.
 *
 * The design offered only a mailto: link. That link is kept — it is the lowest
 * friction option for someone who just wants to send an email — with the form
 * page as the primary CTA alongside it.
 *
 * The availability badge mirrors the design's `showAvailability` prop, now
 * driven by siteConfig.
 */
export function ContactCta() {
  return (
    <section
      id="contact"
      className="bg-surface-raised relative mx-6 overflow-hidden rounded-t-[32px] px-6 pt-24 pb-[110px] md:px-14"
    >
      <div
        aria-hidden="true"
        className="animate-drift-contact bg-accent-fill/12 pointer-events-none absolute -top-[120px] -right-[80px] h-[420px] w-[420px] rounded-full blur-[90px]"
      />

      <div className="reveal relative max-w-[1180px]">
        <div className="text-accent mb-10 font-mono text-[13px] tracking-[0.1em] uppercase">
          Get in touch
        </div>

        <h2 className="m-0 mb-7 max-w-[20em] text-[clamp(2rem,5vw,56px)] leading-[1.08] font-medium tracking-[-0.025em] text-pretty">
          Tell us what you are trying to build.
        </h2>

        <p className="text-ink-muted m-0 mb-12 max-w-[30em] text-xl text-pretty">
          One email is enough to start. Describe the problem, the systems you already run, and when
          you need it working. We reply within one working day.
        </p>

        <div className="flex flex-wrap items-center gap-8">
          <ButtonLink href="/contact" size="lg">
            Start a project
            <ArrowRight />
          </ButtonLink>

          <a
            href={`mailto:${siteConfig.email}`}
            className="border-line-soft text-ink hover:border-accent-link hover:text-accent-link border-b pb-2.5 text-[clamp(1.25rem,3vw,34px)] font-medium tracking-[-0.02em] transition-[color,border-color,letter-spacing] duration-200 hover:tracking-normal"
          >
            {siteConfig.email}
          </a>
        </div>

        {siteConfig.showAvailability ? (
          <div className="text-ink-muted mt-16 flex items-center gap-3 font-mono text-sm">
            <span aria-hidden="true" className="bg-positive inline-block h-2 w-2 rounded-full" />
            Taking on new projects this quarter
          </div>
        ) : null}
      </div>
    </section>
  );
}
