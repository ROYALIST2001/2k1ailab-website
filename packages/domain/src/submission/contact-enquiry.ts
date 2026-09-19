/**
 * The kinds of work the company takes on.
 *
 * Lives in the domain because it is a business fact, not a form detail. The
 * Zod enum in @company/contracts derives from this list, so adding a service
 * line here is a single-place change that the validation layer picks up.
 */
export const PROJECT_TYPES = [
  'software',
  'ai',
  'automation',
  'iot',
  'design',
  'support',
  'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

/** An enquiry from a prospective client. */
export type ContactEnquiry = {
  name: string;
  email: string;
  /** Mobile number, as typed. Stored unformatted — see the contracts schema. */
  phone: string;
  company?: string;
  projectType: ProjectType;
  message: string;
};
