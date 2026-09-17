import { z } from 'zod';

/**
 * Job application contract. Shared by the careers form and its route handler.
 *
 * Deliberately link-based rather than file-upload: accepting CVs means blob
 * storage, virus scanning and a retention policy, none of which exist yet.
 * Swap to uploads once there is a backend to receive them.
 */
export const applicationSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'That name is too long.'),

  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('That does not look like a valid email address.')
    .max(254, 'That email address is too long.'),

  /** Role slug from the vacancy catalogue, or 'open' for a speculative application. */
  role: z.string().trim().min(1, 'Please choose a role.').max(100),

  portfolioUrl: z
    .string()
    .trim()
    .url('Please enter a full URL, including https://.')
    .max(500)
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little about what you have worked on — 20 characters minimum.')
    .max(5000, 'Please keep this under 5000 characters.'),

  /** Honeypot — must stay a permissive string; see the note in contact.ts. */
  website: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
