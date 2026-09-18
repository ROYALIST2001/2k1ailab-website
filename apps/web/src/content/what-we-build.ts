import type { BuildCategory } from '@company/domain';

/** Copy is verbatim from the source artwork. Edit here, not in the component. */
export const buildCategories: readonly BuildCategory[] = [
  {
    title: 'Web & mobile',
    items: ['Websites', 'Web apps', 'Mobile apps', 'E-commerce websites'],
  },
  {
    title: 'Business software',
    items: [
      'POS systems',
      'ERP systems',
      'HR & payroll systems',
      'Accounting systems',
      'Inventory systems',
      'Booking systems',
      'School management systems',
    ],
  },
  {
    title: 'AI & automation',
    items: ['AI chatbots', 'AI agents', 'AI integration', 'Workflow automation'],
  },
  {
    title: 'Smart tech & cloud',
    items: ['IoT systems', 'Smart device integration', 'Cloud & DevOps', 'Custom software'],
  },
] as const;
