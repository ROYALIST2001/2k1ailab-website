import { z } from 'zod';

/**
 * Client-visible environment.
 *
 * Kept in the web app rather than @company/infrastructure because `NEXT_PUBLIC_*`
 * values are inlined at build time by the framework — they have to be read in
 * code the framework compiles. Server-only variables live in
 * `@company/infrastructure`'s `serverEnv`.
 */
const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default('http://localhost:3000')
    // Trailing slashes produce double-slashed canonical URLs in metadata.
    .transform((value) => value.replace(/\/$/, '')),
});

const parsed = schema.safeParse({
  // An empty string is "not set". Docker Compose renders `${VAR:-}` as `''`,
  // which would otherwise bypass `.default()` and fail url() validation.
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid public environment:\n${issues}\n\nSee .env.example.`);
}

export const env = parsed.data;
