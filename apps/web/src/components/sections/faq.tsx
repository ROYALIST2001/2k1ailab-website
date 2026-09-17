import { SectionHeading, Tile } from '@company/ui';
import { faqItems } from '@/content/faq';

/**
 * Two-column Q&A.
 *
 * Kept as always-visible text rather than an accordion, matching the design —
 * every answer is short, and collapsing them would hide content from both
 * readers and search crawlers for no benefit.
 */
export function Faq() {
  return (
    <section id="faq" className="theme-light bg-canvas text-ink">
      <div className="border-line mx-auto max-w-[1180px] border-t px-6 pt-24 pb-[110px] md:px-12">
        <SectionHeading number="03" label="Common questions" className="mb-14" />

        <dl className="m-0 flex flex-col gap-4">
          {faqItems.map((item) => (
            <Tile
              key={item.question}
              className="reveal grid gap-6 px-7 py-7 md:grid-cols-[1fr_1.6fr]"
            >
              <dt className="m-0 text-[19px] font-medium">{item.question}</dt>
              <dd className="text-ink-muted m-0 text-pretty">{item.answer}</dd>
            </Tile>
          ))}
        </dl>
      </div>
    </section>
  );
}
