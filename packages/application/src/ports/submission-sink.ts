import type { Submission, SubmissionResult } from '@company/domain';

/**
 * ============================================================================
 * THE BACKEND SEAM
 * ============================================================================
 *
 * Outbound port for delivering a submission somewhere it will be seen — an
 * inbox, a database, a queue, an external API.
 *
 * The application layer depends on this interface, never on a concrete
 * delivery mechanism. Adding a real backend means writing one adapter in
 * @company/infrastructure and registering it in the composition root
 * (`apps/web/src/server/container.ts`). No use case, route, or component
 * changes.
 */
export interface SubmissionSink {
  /** Adapter name, for logging and diagnostics. */
  readonly name: string;
  deliver(submission: Submission): Promise<SubmissionResult>;
}
