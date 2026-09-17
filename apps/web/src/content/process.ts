import type { ProcessStep } from '@company/domain';

/** Copy is verbatim from the source design. */
export const processSteps: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      "You describe the problem in your own words. We ask questions until we understand it properly, and tell you what's worth building.",
  },
  {
    number: '02',
    title: 'Scope & design',
    description:
      'A written plan and, where needed, screens or mockups to agree on: what gets built, in what order, on what timeline, for what price. Fixed before work starts.',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We build in short cycles and show you working software every week, so you can react early instead of at the end.',
  },
  {
    number: '04',
    title: 'Testing',
    description: "Before anything reaches your users, we test it ourselves and fix what's broken.",
  },
  {
    number: '05',
    title: 'Launch & support',
    description:
      'At launch you get the code, the accounts and the documentation. We stay on for support if you want it, with no obligation to.',
  },
] as const;
