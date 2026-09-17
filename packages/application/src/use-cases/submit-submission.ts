import type { ContactEnquiry, JobApplication, Submission, SubmissionKind } from '@company/domain';

import type { SubmissionSink } from '../ports/submission-sink';

export type SubmitSubmissionInput = {
  kind: SubmissionKind;
  /** Already validated by the contracts layer before it reaches here. */
  payload: ContactEnquiry | JobApplication;
  /** Honeypot value, if the form carried one. */
  honeypot?: string | undefined;
};

export type SubmitSubmissionOutcome =
  | { status: 'accepted'; id: string }
  | { status: 'discarded' }
  | { status: 'failed'; error: string };

/**
 * Accept a submission and deliver it.
 *
 * The honeypot rule lives here rather than in the route because it is a
 * policy decision — "silently drop suspected bots" — not an HTTP concern. Any
 * future transport (an API endpoint, a queue consumer) gets the same behaviour
 * for free.
 */
export class SubmitSubmission {
  constructor(private readonly sink: SubmissionSink) {}

  async execute(input: SubmitSubmissionInput): Promise<SubmitSubmissionOutcome> {
    // A human never sees the honeypot field. Anything in it means a bot filled
    // the form indiscriminately — drop it, and let the caller report success
    // so the bot gets no signal that it was detected.
    if (input.honeypot) {
      return { status: 'discarded' };
    }

    const submission = { kind: input.kind, payload: input.payload } as Submission;
    const result = await this.sink.deliver(submission);

    return result.ok
      ? { status: 'accepted', id: result.id }
      : { status: 'failed', error: result.error };
  }
}
