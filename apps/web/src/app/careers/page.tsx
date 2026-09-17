import type { Metadata } from 'next';

import { ApplicationForm } from '@/components/forms/application-form';
import { ImageSlot, SectionHeading, Tag } from '@company/ui';
import { siteConfig } from '@/config/site';
import { roles } from '@/content/roles';

export const metadata: Metadata = {
  title: 'Careers',
  description: `${siteConfig.name} is hiring software, AI and IoT engineers. See open roles and apply.`,
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <>
      <section className="relative mx-auto grid max-w-[1320px] items-center gap-16 overflow-hidden px-6 pt-36 pb-24 md:px-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          aria-hidden="true"
          className="animate-drift bg-accent-fill/14 pointer-events-none absolute -top-[100px] -left-[90px] h-[380px] w-[380px] rounded-full blur-[80px]"
        />

        <div className="relative z-1">
          <SectionHeading number="04" label="Careers" className="mb-8" />

          <h1 className="m-0 mb-6 text-[clamp(2.25rem,6vw,56px)] leading-[1.05] font-medium tracking-[-0.03em] text-pretty">
            We&rsquo;re hiring.
          </h1>

          <p className="text-ink-muted m-0 max-w-[34em] text-lg text-pretty">
            We are growing our team and looking for engineers in software, AI and IoT. You will work
            directly with clients, take ownership of what you build, and see your work go live.
          </p>
        </div>

        <div className="relative z-1">
          {/* Aspect ratio matches the artwork so none of its text is cropped. */}
          <ImageSlot
            src="/images/2K1-careers-1200x846.png"
            alt="We're hiring. We work with engineers, designers and problem solvers who take ownership of what they build and deliver software our clients can rely on."
            placeholder="Drop a team or workspace photo"
            className="shadow-shade/50 aspect-[2400/1692] w-full rounded-[20px] shadow-[0_30px_60px_-24px]"
          />
        </div>
      </section>

      <section
        id="roles"
        className="border-line mx-auto max-w-[1180px] border-t px-6 pt-20 pb-24 md:px-12"
      >
        <SectionHeading number="01" label="Open roles" className="mb-14" />

        {roles.length === 0 ? (
          <p className="text-ink-muted m-0 max-w-[40em] text-pretty">
            No specific vacancies right now — but we always read open applications. Use the form
            below and tell us what you&rsquo;d want to work on.
          </p>
        ) : (
          <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
            {roles.map((role) => (
              <li
                key={role.slug}
                id={role.slug}
                className="reveal border-line bg-surface flex flex-col rounded-[18px] border p-8"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <Tag>{role.discipline}</Tag>
                  <span className="text-ink-faintest font-mono text-xs">
                    {role.employmentType} · {role.location}
                  </span>
                </div>

                <h3 className="m-0 mb-3 text-2xl font-medium tracking-[-0.01em]">{role.title}</h3>

                <p className="text-ink-muted m-0 mb-6 text-pretty">{role.summary}</p>

                <div className="mt-auto grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-ink-faintest m-0 mb-3 font-mono text-xs tracking-[0.08em] uppercase">
                      What you&rsquo;ll do
                    </h4>
                    <ul className="text-ink-muted m-0 flex list-none flex-col gap-2 p-0 text-sm">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-ink-faintest m-0 mb-3 font-mono text-xs tracking-[0.08em] uppercase">
                      What we look for
                    </h4>
                    <ul className="text-ink-muted m-0 flex list-none flex-col gap-2 p-0 text-sm">
                      {role.requirements.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="#apply"
                  className="text-accent hover:text-accent-hover mt-7 font-mono text-sm"
                >
                  Apply for this role →
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        id="apply"
        className="border-line mx-auto max-w-[1180px] border-t px-6 pt-20 pb-28 md:px-12"
      >
        <SectionHeading number="02" label="Apply" className="mb-14" />

        <div className="border-line bg-surface/50 max-w-[46em] rounded-[20px] border p-6 md:p-10">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
