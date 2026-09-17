import { SectionHeading, cn, tileStyles } from '@company/ui';
import { processSteps } from '@/content/process';

export function Process() {
  return (
    <section id="process" className="theme-light bg-canvas text-ink">
      <div className="border-line mx-auto max-w-[1180px] border-t px-6 pt-24 pb-[110px] md:px-12">
        <SectionHeading number="02" label="How we work" className="mb-14" />

        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className={cn(
                tileStyles,
                'reveal grid grid-cols-[44px_1fr] gap-6 px-6 py-7 transition-transform duration-250 hover:translate-x-1.5',
              )}
            >
              <div className="border-line-accent bg-surface-deep text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-sm">
                {step.number}
              </div>
              <div className="pt-1.5">
                <h3 className="m-0 mb-2.5 text-[22px] font-medium tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-ink-muted m-0 max-w-[46em] text-pretty">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
