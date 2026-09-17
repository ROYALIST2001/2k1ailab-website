import type { Service } from '@company/domain';

/** Copy is verbatim from the source design. Edit here, not in the components. */
export const services: readonly Service[] = [
  {
    number: '01',
    title: 'Building your product',
    description:
      'Whatever your customers or staff use every day, we design and build it, and keep it reliable as more people rely on it.',
    tags: ['Web & mobile apps', 'Internal tools', 'APIs & system integration'],
  },
  {
    number: '02',
    title: 'Making it smarter',
    description:
      'We add the kind of intelligence that reads, understands and answers using your own information, so it feels specific to your business, not generic.',
    tags: ['Document & chat assistants', 'Search over your own data', 'Model & cost tuning'],
  },
  {
    number: '03',
    title: 'Taking the busywork off your plate',
    description:
      "Some jobs don't need a person, just careful software. We build assistants that handle the repetitive, multi-step work, with clear limits and a record of everything they do.",
    tags: ['Workflow automation', 'Support & back-office agents', 'Human approval steps'],
  },
  {
    number: '04',
    title: 'Connecting your equipment',
    description:
      'If it has a sensor or a switch, we can bring it online: readings shown clearly on a screen, and automatic action when something needs attention.',
    tags: ['Device & sensor connectivity', 'Telemetry dashboards', 'Alerts & remote control'],
  },
  {
    number: '05',
    title: 'Design',
    description:
      'Before anything is built, we work out how it should look and feel: the screens, the flow, the details that make it easy to use.',
    tags: ['Product design', 'Prototypes', 'Brand & UI'],
  },
  {
    number: '06',
    title: 'Support & upkeep',
    description:
      "Once it's live, we keep it running: fixing issues, applying updates, and making small improvements as your needs change.",
    tags: ['Maintenance', 'Hosting & monitoring', 'Ongoing improvements'],
  },
] as const;
