import { z } from 'zod';

/**
 * Server-side environment.
 *
 * Validated once at module load, so a misconfigured deploy fails loudly at
 * boot instead of throwing inside a request handler. Import `serverEnv` —
 * never read `process.env` directly elsewhere.
 *
 * Client-visible configuration (`NEXT_PUBLIC_*`) deliberately lives in the web
 * app, not here: those values are inlined at build time by the framework, and
 * this package must stay usable from a plain Node service too.
 */

/**
 * Treat an empty string as "not set".
 *
 * Docker Compose renders `${VAR:-}` as an empty string rather than omitting
 * the variable, and CI systems do the same. Without this, `BACKEND_API_URL=""`
 * is *present but invalid* — `.optional()` does not apply — and the process
 * dies at boot on a variable the operator never intended to set.
 */
const optionalString = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => (value === '' ? undefined : value), schema.optional());

const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    /** Inbox that receives submissions. Required when an email sink is set. */
    CONTACT_INBOX: optionalString(z.string().email()),

    /** Set to deliver submissions by email through Resend. */
    RESEND_API_KEY: optionalString(z.string().min(1)),
    /** Sender address, e.g. `Company <noreply@company.com>` on a verified domain. */
    RESEND_FROM: optionalString(z.string().min(3)),

    /** Set once a real backend exists; selects the HTTP sink. */
    BACKEND_API_URL: optionalString(z.string().url()),
    BACKEND_API_KEY: optionalString(z.string().min(1)),
  })
  .refine((env) => !env.RESEND_API_KEY || env.CONTACT_INBOX, {
    path: ['CONTACT_INBOX'],
    message: 'CONTACT_INBOX is required when RESEND_API_KEY is set.',
  });

const parsed = schema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  CONTACT_INBOX: process.env.CONTACT_INBOX,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  BACKEND_API_URL: process.env.BACKEND_API_URL,
  BACKEND_API_KEY: process.env.BACKEND_API_KEY,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid server environment:\n${issues}\n\nSee .env.example.`);
}

export const serverEnv = parsed.data;

export const isProduction = serverEnv.NODE_ENV === 'production';
