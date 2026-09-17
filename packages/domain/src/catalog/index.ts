/**
 * What the company offers and hires for.
 *
 * Types only — the actual copy lives in the presentation layer
 * (`apps/web/src/content`), because it is marketing text, not business logic.
 * Keeping the shapes here means a future API or CMS can produce the same
 * structures without depending on the website.
 */

export type Service = {
  /** Two-digit ordinal shown above the card title. */
  number: string;
  title: string;
  description: string;
  /** Capability pills rendered under the description. */
  tags: readonly string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Role = {
  /** URL-safe id; also the value submitted with an application. */
  slug: string;
  title: string;
  discipline: string;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
};
