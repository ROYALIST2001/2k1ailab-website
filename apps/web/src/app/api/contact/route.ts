import { contactSchema } from '@company/contracts';

import { createSubmissionRoute } from '@/server/http/create-submission-route';

/** Always run per-request: this endpoint has side effects and rate limiting. */
export const dynamic = 'force-dynamic';

export const POST = createSubmissionRoute({
  schema: contactSchema,
  kind: 'contact',
});
