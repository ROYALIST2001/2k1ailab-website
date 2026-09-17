import type { SubmissionSink } from '@company/application';
import type { Submission, SubmissionResult } from '@company/domain';

/** Forwards submissions to an external backend as JSON. */
export class HttpSubmissionSink implements SubmissionSink {
  readonly name = 'http';

  private readonly baseUrl: string;

  constructor(
    baseUrl: string,
    private readonly apiKey?: string | undefined,
    private readonly timeoutMs = 10_000,
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async deliver(submission: Submission): Promise<SubmissionResult> {
    const id = globalThis.crypto.randomUUID();

    try {
      const response = await fetch(`${this.baseUrl}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify({ id, kind: submission.kind, ...submission.payload }),
        // Don't let a hanging backend hold the request open indefinitely.
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        console.error(`[submissions] Backend responded ${response.status} for ${id}`);
        return { ok: false, error: 'The delivery service rejected this submission.' };
      }

      return { ok: true, id };
    } catch (error) {
      // Log the detail server-side; the caller gets a generic message so we
      // don't leak backend hostnames or stack traces to the browser.
      console.error(`[submissions] Delivery failed for ${id}:`, error);
      return { ok: false, error: 'Could not reach the delivery service.' };
    }
  }
}
