import { applicationSchema } from '@company/contracts';

import { createSubmissionRoute } from '@/server/http/create-submission-route';

export const dynamic = 'force-dynamic';

export const POST = createSubmissionRoute({
  schema: applicationSchema,
  kind: 'application',
  // Applications are lower-volume than enquiries; a tighter cap is fine.
  limit: 3,
});
