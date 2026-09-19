import { PROJECT_TYPES } from '@company/domain';
import { z } from 'zod';

/**
 * Contact form contract.
 *
 * Imported by both the browser and the route handler, so the rules enforced on
 * each side can never drift. The server re-validates regardless — client
 * validation is a convenience, not a control.
 *
 * The project-type enum is derived from the domain's PROJECT_TYPES, so adding
 * a service line is a one-place change.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'That name is too long.'),

  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('That does not look like a valid email address.')
    .max(254, 'That email address is too long.'),

  /**
   * Mobile number. Required, but the format is deliberately permissive:
   * visitors write numbers with spaces, dashes, brackets and country codes in
   * every combination, and rejecting those is a bad trade for a contact form.
   * The digit count is what is actually checked — 7 is the shortest national
   * number in use, 15 the E.164 maximum.
   */
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your mobile number.')
    .max(32, 'That number is too long.')
    .refine((value) => {
      const digits = value.replace(/\D/g, '').length;
      return digits >= 7 && digits <= 15;
    }, 'Please enter a valid mobile number, including the country code.'),

  company: z
    .string()
    .trim()
    .max(120, 'That company name is too long.')
    .optional()
    .or(z.literal('')),

  projectType: z.enum(PROJECT_TYPES, {
    errorMap: () => ({ message: 'Please choose what you need help with.' }),
  }),

  message: z
    .string()
    .trim()
    .min(20, 'Please give us at least a sentence or two — 20 characters minimum.')
    .max(5000, 'Please keep this under 5000 characters.'),

  /**
   * Honeypot. Hidden from real users via CSS and aria-hidden; bots that fill
   * every field will populate it.
   *
   * Accepts any string on purpose. Constraining it to `''` here would make a
   * tripped honeypot fail schema validation, which returns a 400 naming this
   * field — telling the bot exactly which input gave it away. The submission
   * use case checks it instead and discards behind a normal success response.
   * Do not "tighten" this to z.literal('').
   */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
