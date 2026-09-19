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

/**
 * The same offering in plain language, for the ticker under the hero.
 *
 * Deliberately not derived from `buildCategories`: that list is the panel's
 * precise wording, this one drops the jargon a passer-by would not know
 * ("ERP", "POS", "DevOps") in favour of what the thing actually does.
 */
export const buildShortNames: readonly string[] = [
  'Websites',
  'Web apps',
  'Mobile apps',
  'Online stores',
  'Billing systems',
  'Business management',
  'Staff & payroll',
  'Accounting',
  'Stock management',
  'Booking systems',
  'School systems',
  'AI chatbots',
  'AI assistants',
  'Automation',
  'Smart devices',
  'Cloud hosting',
  'Custom software',
] as const;
