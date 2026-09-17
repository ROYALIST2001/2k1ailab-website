'use client';

import { useCallback, useState } from 'react';
import type { z } from 'zod';

import type { FieldErrors, SubmissionResponse } from '@company/contracts';

/**
 * Client-side form state for the contact and application forms.
 *
 * Deliberately dependency-free — two forms do not justify react-hook-form. It
 * validates with the same Zod schema the server uses, so messages match
 * exactly, and it still merges server-returned field errors: the server is the
 * authority, and it can reject things the client cannot check.
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Generic over the value shape so `values.name` types as `string`, not
 * `string | undefined`. With a plain `Record<string, string>` and
 * `noUncheckedIndexedAccess`, every field would widen to include undefined and
 * React would quietly flip the inputs from controlled to uncontrolled.
 */
export function useSubmissionForm<
  TSchema extends z.ZodTypeAny,
  TValues extends Record<string, string>,
>({
  schema,
  endpoint,
  initialValues,
}: {
  schema: TSchema;
  endpoint: string;
  initialValues: TValues;
}) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const setValue = useCallback((field: keyof TValues & string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear this field's error as soon as the user edits it; keeping a stale
    // message visible while they type reads as broken.
    setErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setFormError(null);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormError(null);

      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of parsed.error.issues) {
          const field = issue.path[0];
          if (typeof field === 'string' && !(field in fieldErrors)) {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
        setStatus('error');
        setFormError('Please correct the highlighted fields.');
        return;
      }

      setStatus('submitting');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        });

        const result = (await response.json()) as SubmissionResponse;

        if (!response.ok || !result.ok) {
          const message =
            'message' in result ? result.message : 'Something went wrong. Please try again.';
          if ('fieldErrors' in result && result.fieldErrors) setErrors(result.fieldErrors);
          setFormError(message);
          setStatus('error');
          return;
        }

        setValues(initialValues);
        setErrors({});
        setStatus('success');
      } catch {
        // Network-level failure — the request never got a response.
        setFormError('Could not reach the server. Check your connection and try again.');
        setStatus('error');
      }
    },
    [endpoint, initialValues, schema, values],
  );

  return {
    values,
    errors,
    status,
    formError,
    setValue,
    handleSubmit,
    reset,
    isSubmitting: status === 'submitting',
  };
}
