'use client';

import { ArrowRight, Button, Field, Honeypot, Input, Select, Textarea } from '@company/ui';
import { siteConfig } from '@/config/site';
import { roles } from '@/content/roles';
import { useSubmissionForm } from '@/hooks/use-submission-form';
import { applicationSchema } from '@company/contracts';

/**
 * @param defaultRole Slug to preselect, so "Apply" on a specific role lands
 *                    here with that role already chosen.
 */
export function ApplicationForm({ defaultRole = '' }: { defaultRole?: string }) {
  const form = useSubmissionForm({
    schema: applicationSchema,
    endpoint: '/api/careers',
    initialValues: {
      name: '',
      email: '',
      role: defaultRole,
      portfolioUrl: '',
      message: '',
      website: '',
    },
  });

  if (form.status === 'success') {
    return (
      <div
        role="status"
        className="border-line-accent bg-surface rounded-[18px] border p-9 text-center"
      >
        <h2 className="m-0 mb-3 text-2xl font-medium">Application received.</h2>
        <p className="text-ink-muted m-0 mb-7 text-pretty">
          Thanks for writing in. We read every application and will get back to you either way.
        </p>
        <Button type="button" variant="ghost" size="md" onClick={form.reset}>
          Apply for another role
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="relative flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" required error={form.errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={form.values.name}
            invalid={Boolean(form.errors.name)}
            aria-describedby={form.errors.name ? 'name-error' : undefined}
            onChange={(event) => form.setValue('name', event.target.value)}
          />
        </Field>

        <Field id="email" label="Email" required error={form.errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.values.email}
            invalid={Boolean(form.errors.email)}
            aria-describedby={form.errors.email ? 'email-error' : undefined}
            onChange={(event) => form.setValue('email', event.target.value)}
          />
        </Field>
      </div>

      <Field id="role" label="Role" required error={form.errors.role}>
        <Select
          id="role"
          name="role"
          value={form.values.role}
          invalid={Boolean(form.errors.role)}
          aria-describedby={form.errors.role ? 'role-error' : undefined}
          onChange={(event) => form.setValue('role', event.target.value)}
        >
          <option value="" disabled>
            Choose a role…
          </option>
          {roles.map((role) => (
            <option key={role.slug} value={role.slug}>
              {role.title}
            </option>
          ))}
          <option value="open">Open application</option>
        </Select>
      </Field>

      <Field
        id="portfolioUrl"
        label="Portfolio, GitHub or LinkedIn"
        error={form.errors.portfolioUrl}
        hint="A link works better than an attachment — include https://."
      >
        <Input
          id="portfolioUrl"
          name="portfolioUrl"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={form.values.portfolioUrl}
          invalid={Boolean(form.errors.portfolioUrl)}
          aria-describedby={form.errors.portfolioUrl ? 'portfolioUrl-error' : 'portfolioUrl-hint'}
          onChange={(event) => form.setValue('portfolioUrl', event.target.value)}
        />
      </Field>

      <Field
        id="message"
        label="What have you worked on?"
        required
        error={form.errors.message}
        hint="A couple of projects you're proud of, and what your part in them was."
      >
        <Textarea
          id="message"
          name="message"
          rows={7}
          value={form.values.message}
          invalid={Boolean(form.errors.message)}
          aria-describedby={form.errors.message ? 'message-error' : 'message-hint'}
          onChange={(event) => form.setValue('message', event.target.value)}
        />
      </Field>

      <Honeypot value={form.values.website ?? ''} onChange={(v) => form.setValue('website', v)} />

      {form.formError ? (
        <p role="alert" className="text-accent m-0 text-sm">
          {form.formError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" size="lg" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Sending…' : 'Send application'}
          {form.isSubmitting ? null : <ArrowRight />}
        </Button>
        <span className="text-ink-faint font-mono text-[13px]">
          Or email {siteConfig.email} directly.
        </span>
      </div>
    </form>
  );
}
