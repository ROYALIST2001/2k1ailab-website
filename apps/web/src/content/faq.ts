import type { FaqItem } from '@company/domain';

/**
 * Copy is verbatim from the source design.
 *
 * Also consumed by the FAQPage JSON-LD in app/page.tsx — adding an entry here
 * adds it to the structured data automatically.
 */
export const faqItems: readonly FaqItem[] = [
  {
    question: 'How do you price a project?',
    answer:
      'We scope the work first and quote a fixed price for it. No hourly billing surprises. If the scope changes partway through, we tell you before it affects the price.',
  },
  {
    question: 'Who will I be talking to?',
    answer:
      'The people building your project, directly. No account managers relaying messages back and forth.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes. Happy to sign one before we discuss any specifics of your project.',
  },
  {
    question: 'What happens after launch?',
    answer:
      "You get the code, the accounts, and the documentation. We're also available for ongoing support and maintenance if you want it, but you're never locked into that.",
  },
  {
    question: 'How small a project will you take on?',
    answer:
      "If it's well-defined and worth doing properly, we'll talk about it. Send us an email and we'll tell you honestly if we're the right fit.",
  },
] as const;
