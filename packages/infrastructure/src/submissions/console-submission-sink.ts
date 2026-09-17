import type { SubmissionSink } from '@company/application';
import type { Submission, SubmissionResult } from '@company/domain';

/**
 * Development / unconfigured default.
 *
 * Reports success so the UI can be exercised realistically, but delivers
 * nothing. The production warning is the reminder that a real deploy still
 * needs a real sink.
 */
export class ConsoleSubmissionSink implements SubmissionSink {
  readonly name = 'console';

  constructor(private readonly isProduction: boolean) {}

  async deliver(submission: Submission): Promise<SubmissionResult> {
    const id = globalThis.crypto.randomUUID();

    console.info(
      `\n──── ${submission.kind} submission [${id}] ────\n` +
        JSON.stringify(submission.payload, null, 2) +
        `\n─────────────────────────────────────────\n`,
    );

    if (this.isProduction) {
      console.warn(
        '[submissions] Running the console sink in production — this submission was ' +
          'logged but NOT delivered to anyone. Set BACKEND_API_URL, or register a ' +
          'provider adapter in the composition root.',
      );
    }

    return { ok: true, id };
  }
}
