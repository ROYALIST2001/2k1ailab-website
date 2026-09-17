import type { SubmissionSink } from '@company/application';
import type { Submission, SubmissionResult } from '@company/domain';

export type ResendSubmissionSinkOptions = {
  apiKey: string;
  /** Sender, e.g. `Company <noreply@company.com>`. Must be a verified domain,
   *  or Resend's `onboarding@resend.dev` while testing. */
  from: string;
  /** Inbox that receives every submission. */
  to: string;
  timeoutMs?: number;
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Keep user-supplied text to one line so it can sit in a subject. */
function oneLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Plain text only: nothing a visitor types can become markup in the inbox. */
function render(submission: Submission, id: string): { subject: string; text: string } {
  const name = oneLine(submission.payload.name);

  const lines: string[] = [];
  let subject: string;

  // Narrow on `kind` before touching the payload: destructuring it first
  // would collapse the union and lose the per-kind fields.
  if (submission.kind === 'contact') {
    const { payload } = submission;
    subject = `New enquiry from ${name} (${payload.projectType})`;
    lines.push(
      'New contact enquiry from the website.',
      '',
      `Name:     ${name}`,
      `Email:    ${payload.email}`,
      `Company:  ${payload.company ? oneLine(payload.company) : '—'}`,
      `Project:  ${payload.projectType}`,
    );
  } else {
    const { payload } = submission;
    subject = `Job application: ${oneLine(payload.role)} — ${name}`;
    lines.push(
      'New job application from the website.',
      '',
      `Name:       ${name}`,
      `Email:      ${payload.email}`,
      `Role:       ${oneLine(payload.role)}`,
      `Portfolio:  ${payload.portfolioUrl ?? '—'}`,
    );
  }

  lines.push(
    '',
    'Message:',
    submission.payload.message.trim(),
    '',
    '—',
    `Reply to this email to answer ${name} directly.`,
    `Reference: ${id}`,
  );

  return { subject, text: lines.join('\n') };
}

/**
 * Delivers submissions as email through Resend's REST API.
 *
 * Talks to the HTTP endpoint directly rather than through the SDK: it is a
 * single POST, and keeping this package dependency-free lets a plain Node
 * service reuse it. The visitor's address goes in Reply-To so answering from
 * the inbox reaches them, while the From stays on a domain Resend trusts.
 */
export class ResendSubmissionSink implements SubmissionSink {
  readonly name = 'resend';

  private readonly timeoutMs: number;

  constructor(private readonly options: ResendSubmissionSinkOptions) {
    this.timeoutMs = options.timeoutMs ?? 10_000;
  }

  async deliver(submission: Submission): Promise<SubmissionResult> {
    const id = globalThis.crypto.randomUUID();
    const { subject, text } = render(submission, id);

    try {
      const response = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.options.from,
          to: [this.options.to],
          reply_to: submission.payload.email,
          subject,
          text,
          headers: { 'X-Entity-Ref-ID': id },
        }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        // Resend explains rejections in the body (unverified domain, bad key…).
        // That detail is for the server log; the visitor gets a generic message.
        const detail = await response.text().catch(() => '');
        console.error(`[submissions] Resend responded ${response.status} for ${id}: ${detail}`);
        return {
          ok: false,
          error: 'Could not send your message right now. Please email us directly.',
        };
      }

      return { ok: true, id };
    } catch (error) {
      console.error(`[submissions] Resend delivery failed for ${id}:`, error);
      return {
        ok: false,
        error: 'Could not send your message right now. Please email us directly.',
      };
    }
  }
}
