import 'server-only';

import { SubmitSubmission, type RateLimiter, type SubmissionSink } from '@company/application';
import {
  ConsoleSubmissionSink,
  HttpSubmissionSink,
  InMemoryRateLimiter,
  ResendSubmissionSink,
  isProduction,
  serverEnv,
} from '@company/infrastructure';

import { siteConfig } from '@/config/site';

/**
 * Composition root.
 *
 * The one module allowed to know about both the application layer and concrete
 * infrastructure. Everything else depends on interfaces, which is what keeps
 * the dependency arrows pointing inward — routes and use cases have no idea
 * whether submissions go to a console, an HTTP backend, or a queue.
 *
 * To add a provider: implement `SubmissionSink` in @company/infrastructure and
 * return it from `createSubmissionSink()` below. Nothing else changes.
 *
 * Selection order: Resend (email) if configured, else an HTTP backend, else
 * the console. Email is first because it is the delivery path this site
 * actually uses; the HTTP sink is kept for a future backend.
 */
function createSubmissionSink(): SubmissionSink {
  if (serverEnv.RESEND_API_KEY && serverEnv.CONTACT_INBOX) {
    return new ResendSubmissionSink({
      apiKey: serverEnv.RESEND_API_KEY,
      to: serverEnv.CONTACT_INBOX,
      // Resend's shared test sender works before a domain is verified, but
      // only delivers to the address that owns the Resend account.
      from: serverEnv.RESEND_FROM ?? `${siteConfig.name} <onboarding@resend.dev>`,
    });
  }
  if (serverEnv.BACKEND_API_URL) {
    return new HttpSubmissionSink(serverEnv.BACKEND_API_URL, serverEnv.BACKEND_API_KEY);
  }
  return new ConsoleSubmissionSink(isProduction);
}

type Container = {
  submitSubmission: SubmitSubmission;
  rateLimiter: RateLimiter;
  sinkName: string;
};

let container: Container | undefined;

/**
 * Lazily built and cached for the process lifetime.
 *
 * The rate limiter in particular must be a singleton — a fresh instance per
 * request would hold an empty window map and never limit anything.
 */
export function getContainer(): Container {
  if (!container) {
    const sink = createSubmissionSink();
    container = {
      submitSubmission: new SubmitSubmission(sink),
      rateLimiter: new InMemoryRateLimiter(),
      sinkName: sink.name,
    };
  }
  return container;
}
