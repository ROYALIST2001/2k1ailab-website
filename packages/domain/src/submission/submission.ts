import type { ContactEnquiry } from './contact-enquiry';
import type { JobApplication } from './job-application';

export type SubmissionKind = 'contact' | 'application';

/**
 * Anything a visitor can send the company.
 *
 * A discriminated union rather than a shared base type: the two payloads have
 * almost nothing in common, and the discriminant is what every downstream
 * handler switches on.
 */
export type Submission =
  { kind: 'contact'; payload: ContactEnquiry } | { kind: 'application'; payload: JobApplication };

/** Opaque identifier assigned when a submission is accepted. */
export type SubmissionId = string;

/**
 * Outcome of attempting to deliver a submission.
 *
 * `error` is a message safe to show a visitor — adapters log the underlying
 * cause and return something generic, so backend hostnames and stack traces
 * never reach the browser.
 */
export type SubmissionResult = { ok: true; id: SubmissionId } | { ok: false; error: string };
