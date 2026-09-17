/**
 * The HTTP contract between the browser and the submission endpoints.
 *
 * Shared so the form hook and the route handler agree on the response shape
 * without either importing the other.
 */

/** `{ fieldName: firstMessage }` — at most one message per field. */
export type FieldErrors = Record<string, string>;

export type SubmissionResponse =
  { ok: true; id: string } | { ok: false; message: string; fieldErrors?: FieldErrors };
