'use client';

import { ArrowRight, Button, Field, Honeypot, Input, Select, Textarea } from '@company/ui';
import { siteConfig } from '@/config/site';
import { useSubmissionForm } from '@/hooks/use-submission-form';
import { contactSchema } from '@company/contracts';
import { projectTypeOptions } from '@/content/project-types';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  message: '',
  website: '',
};

export function ContactForm() {
  const form = useSubmissionForm({
    schema: contactSchema,
    endpoint: '/api/contact',
    initialValues: INITIAL,
  });

  if (form.status === 'success') {
    return (
      <div
        role="status"
        className="border-line-accent bg-surface rounded-[18px] border p-9 text-center"
      >
        <div className="bg-accent text-on-accent mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h2 className="m-0 mb-3 text-2xl font-medium">Thanks — that&rsquo;s with us.</h2>
        <p className="text-ink-muted m-0 mb-7 text-pretty">
          We reply within one working day. If it&rsquo;s urgent, email us directly at{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-accent hover:text-accent-hover">
            {siteConfig.email}
          </a>
          .
        </p>
        <Button type="button" variant="ghost" size="md" onClick={form.reset}>
          Send another
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="phone" label="Mobile number" required error={form.errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+94 77 123 4567"
            value={form.values.phone}
            invalid={Boolean(form.errors.phone)}
            aria-describedby={form.errors.phone ? 'phone-error' : undefined}
            onChange={(event) => form.setValue('phone', event.target.value)}
          />
        </Field>

        <Field id="company" label="Company" error={form.errors.company}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            value={form.values.company}
            invalid={Boolean(form.errors.company)}
            onChange={(event) => form.setValue('company', event.target.value)}
          />
        </Field>
      </div>

      <Field id="projectType" label="What do you need?" required error={form.errors.projectType}>
        <Select
          id="projectType"
          name="projectType"
          value={form.values.projectType}
          invalid={Boolean(form.errors.projectType)}
          aria-describedby={form.errors.projectType ? 'projectType-error' : undefined}
          onChange={(event) => form.setValue('projectType', event.target.value)}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {projectTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id="message"
        label="About the project"
        required
        error={form.errors.message}
        hint="The problem, the systems you already run, and when you need it working."
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
          {form.isSubmitting ? 'Sending…' : 'Send enquiry'}
          {form.isSubmitting ? null : <ArrowRight />}
        </Button>
        <span className="text-ink-faint font-mono text-[13px]">
          Or email {siteConfig.email} directly.
        </span>
      </div>
    </form>
  );
}
