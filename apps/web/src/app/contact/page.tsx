import type { Metadata } from 'next';

import { ContactForm } from '@/components/forms/contact-form';
import { SectionHeading } from '@company/ui';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Tell ${siteConfig.name} what you are trying to build. We reply within one working day.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1180px] gap-16 px-6 pt-36 pb-28 md:px-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="relative">
        <div
          aria-hidden="true"
          className="animate-drift bg-accent-fill/12 pointer-events-none absolute -top-[120px] -left-[120px] h-[360px] w-[360px] rounded-full blur-[90px]"
        />

        <div className="relative">
          <SectionHeading number="05" label="Get in touch" className="mb-8" />

          <h1 className="m-0 mb-6 text-[clamp(2rem,5vw,44px)] leading-[1.1] font-medium tracking-[-0.025em] text-pretty">
            Tell us what you are trying to build.
          </h1>

          <p className="text-ink-muted m-0 mb-10 max-w-[34em] text-lg text-pretty">
            Describe the problem, the systems you already run, and when you need it working. We
            reply within one working day.
          </p>

          <dl className="border-line m-0 flex flex-col gap-6 border-t pt-8 font-mono text-sm">
            <div>
              <dt className="text-ink-faintest mb-2 tracking-[0.08em] uppercase">Email</dt>
              <dd className="m-0">
                <a href={`mailto:${siteConfig.email}`} className="text-ink hover:text-accent-link">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-faintest mb-2 tracking-[0.08em] uppercase">Response time</dt>
              <dd className="text-ink-muted m-0">Within one working day</dd>
            </div>
            <div>
              <dt className="text-ink-faintest mb-2 tracking-[0.08em] uppercase">NDAs</dt>
              <dd className="text-ink-muted m-0">Happy to sign before we discuss specifics</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-line bg-surface/50 rounded-[20px] border p-6 md:p-10">
        <ContactForm />
      </div>
    </div>
  );
}
