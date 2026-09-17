import { ArrowRight, ButtonLink, ImageSlot, SectionHeading, Tile } from '@company/ui';

/**
 * Careers teaser on the home page. The CTA routes to the full /careers page
 * rather than opening a mailto, which is where the design pointed it.
 */
export function CareersTeaser() {
  return (
    <section id="careers" className="theme-light bg-canvas text-ink">
      <div className="border-line mx-auto grid max-w-[1320px] items-center gap-8 border-t px-6 pt-24 pb-[110px] md:px-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Aspect ratio matches the artwork so none of its text is cropped. */}
        <ImageSlot
          src="/images/2K1-careers-1200x846.png"
          alt="We're hiring. We work with engineers, designers and problem solvers who take ownership of what they build and deliver software our clients can rely on."
          placeholder="Drop a team or workspace photo"
          className="reveal shadow-shade/50 aspect-[2400/1692] w-full rounded-[20px] shadow-[0_30px_60px_-24px]"
        />

        {/* Heading sits on the white band, directly above the tile it introduces. */}
        <div>
          <SectionHeading number="04" label="Careers" className="mb-6" />

          <Tile className="reveal p-8 md:p-12">
            <h3 className="m-0 mb-4.5 text-[32px] font-medium tracking-[-0.015em] text-pretty">
              We&rsquo;re hiring.
            </h3>

            <p className="text-ink-muted m-0 mb-8 max-w-[34em] text-pretty">
              We are growing our team and looking for engineers in software, AI and IoT. If you
              enjoy solving real problems and take pride in work that clients can rely on, we would
              like to hear from you.
            </p>

            <ButtonLink href="/careers" size="md">
              See open roles
              <ArrowRight />
            </ButtonLink>
          </Tile>
        </div>
      </div>
    </section>
  );
}
