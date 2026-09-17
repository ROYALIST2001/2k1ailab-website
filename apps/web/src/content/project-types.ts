import type { ProjectType } from '@company/domain';

/**
 * Display labels for the domain's project types.
 *
 * Presentation, not domain: the values come from @company/domain, the wording
 * belongs to the marketing site. `satisfies` makes the compiler check that
 * every option is a real ProjectType, so a typo can't slip into the form.
 */
export const projectTypeOptions = [
  { value: 'software', label: 'Building a product' },
  { value: 'ai', label: 'AI / making it smarter' },
  { value: 'automation', label: 'Workflow automation' },
  { value: 'iot', label: 'IoT / connecting equipment' },
  { value: 'design', label: 'Design' },
  { value: 'support', label: 'Support & upkeep' },
  { value: 'other', label: 'Something else' },
] as const satisfies readonly { value: ProjectType; label: string }[];
