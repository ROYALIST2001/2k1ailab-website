import 'server-only';

import type { FieldErrors, SubmissionResponse } from '@company/contracts';
import type { ContactEnquiry, JobApplication, SubmissionKind } from '@company/domain';
import { NextResponse } from 'next/server';
import type { z } from 'zod';

import { getContainer } from '../container';

/**
 * HTTP adapter for the submission use case.
 *
 * Its job is transport only — throttle, parse, validate, translate the use
 * case's outcome into status codes. The decision about what to do with a
 * submission lives in @company/application; this file just speaks HTTP.
 */

/** Flattens Zod issues into `{ fieldName: firstMessage }` for the form UI. */
function toFieldErrors(error: z.ZodError): FieldErrors {
  const result: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !(field in result)) {
      result[field] = issue.message;
    }
  }
  return result;
}

/**
 * Best-effort client identifier.
 *
 * `x-forwarded-for` is spoofable unless a trusted proxy sets it — treat the
 * result as a spam-throttling hint, never as authentication.
 */
function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export function createSubmissionRoute<TSchema extends z.ZodTypeAny>(options: {
  schema: TSchema;
  kind: SubmissionKind;
  /** Max submissions per client per window. */
  limit?: number;
  windowMs?: number;
}) {
  const { schema, kind, limit = 5, windowMs = 60_000 } = options;

  return async function POST(request: Request): Promise<NextResponse<SubmissionResponse>> {
    const { submitSubmission, rateLimiter } = getContainer();

    const decision = await rateLimiter.check(`${kind}:${getClientKey(request)}`, {
      limit,
      windowMs,
    });

    if (!decision.allowed) {
      return NextResponse.json(
        { ok: false, message: 'Too many submissions. Please wait a moment and try again.' },
        { status: 429, headers: { 'Retry-After': String(decision.retryAfter) } },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, message: 'Malformed request body.' }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Please correct the highlighted fields.',
          fieldErrors: toFieldErrors(parsed.error),
        },
        { status: 400 },
      );
    }

    const { website, ...payload } = parsed.data as { website?: string } & (
      ContactEnquiry | JobApplication
    );

    const outcome = await submitSubmission.execute({ kind, payload, honeypot: website });

    switch (outcome.status) {
      case 'accepted':
        return NextResponse.json({ ok: true, id: outcome.id }, { status: 201 });

      // Honeypot tripped. Report success so the bot gets no signal that it was
      // detected — nothing was delivered.
      case 'discarded':
        return NextResponse.json({ ok: true, id: 'discarded' }, { status: 200 });

      case 'failed':
        return NextResponse.json({ ok: false, message: outcome.error }, { status: 502 });
    }
  };
}
