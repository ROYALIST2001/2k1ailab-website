/**
 * An application for a role.
 *
 * `role` is a slug from the vacancy catalogue, or the literal `'open'` for a
 * speculative application.
 */
export type JobApplication = {
  name: string;
  email: string;
  role: string;
  portfolioUrl?: string;
  message: string;
};

export const OPEN_APPLICATION_ROLE = 'open';
