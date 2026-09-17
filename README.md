# Company Website — monorepo

Marketing site built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4,
organised as an npm-workspaces monorepo with a layered architecture and ported
from the Claude Design source in [`design/`](./design).

## Quick start

```bash
npm install                  # installs every workspace
cp .env.example .env.local   # optional — every value has a working default
npm run dev                  # http://localhost:3000
```

The contact and careers forms work immediately with no configuration: with
nothing set, submissions are logged to the server console. To receive them by
email, set `RESEND_API_KEY` and `CONTACT_INBOX` in `.env.local` (see
`.env.example`).

### With Docker

```bash
npm run docker:build
npm run docker:up            # http://localhost:3000
npm run docker:logs
npm run docker:down
```

## Architecture

Dependencies point **inward**. An inner layer never imports an outer one.

```
        ┌────────────────────────────────────────────┐
        │  apps/web            presentation + wiring │
        └───────┬───────────────────────┬────────────┘
                │                       │
        ┌───────▼─────────┐     ┌───────▼────────┐
        │ infrastructure  │     │       ui       │  design system
        │   adapters      │     └────────────────┘
        └───────┬─────────┘
        ┌───────▼─────────┐
        │  application    │  use cases + ports (interfaces)
        └───────┬─────────┘
        ┌───────▼─────────┐
        │   contracts     │  Zod schemas / DTOs
        └───────┬─────────┘
        ┌───────▼─────────┐
        │     domain      │  entities. depends on nothing
        └─────────────────┘
```

| Workspace                 | Layer | Responsibility                                             |
| ------------------------- | ----- | ---------------------------------------------------------- |
| `packages/domain`         | 1     | Entities, value types. No framework, no Zod, no React.     |
| `packages/contracts`      | 1b    | Zod schemas + DTOs shared across the wire.                 |
| `packages/application`    | 2     | Use cases and **ports** (`SubmissionSink`, `RateLimiter`). |
| `packages/infrastructure` | 3     | Adapters implementing those ports. Framework-agnostic.     |
| `packages/ui`             | —     | Design system: tokens + presentational primitives.         |
| `packages/config`         | —     | Shared `tsconfig` / ESLint bases.                          |
| `apps/web`                | 4     | Next.js site + the composition root.                       |
| `apps/api`                | —     | **Reserved, empty.** See its README.                       |
| `db`                      | —     | **Reserved, empty.** See its README.                       |

### The boundaries are enforced, not just documented

npm workspaces hoist dependencies to the root, so a package can physically
resolve anything installed anywhere — `dependencies` alone will not stop a bad
import. The rules in [`eslint.config.mjs`](./eslint.config.mjs) are what
actually hold the architecture:

```bash
npm run lint
```

A domain file importing `zod` or `@company/application` fails lint. Application
code importing `@company/infrastructure` fails lint. Only
`apps/web/src/server/container.ts` — the composition root — may construct
concrete adapters.

### Form delivery

Nothing outside the composition root knows how submissions are delivered.
Three adapters ship, selected in
[`apps/web/src/server/container.ts`](./apps/web/src/server/container.ts):

| Adapter                 | When                               | Does                                              |
| ----------------------- | ---------------------------------- | ------------------------------------------------- |
| `ResendSubmissionSink`  | `RESEND_API_KEY` + `CONTACT_INBOX` | Emails each submission; Reply-To is the visitor   |
| `HttpSubmissionSink`    | `BACKEND_API_URL`                  | Forwards JSON to `${BACKEND_API_URL}/submissions` |
| `ConsoleSubmissionSink` | nothing set                        | Logs to the server console                        |

To add another provider, implement `SubmissionSink` (from
`@company/application`) in `packages/infrastructure` and return it from
`createSubmissionSink()`. No route, form or component changes.

## Scripts

Run from the repo root.

| Command             | Does                                            |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                      |
| `npm run build`     | Production build (fails on type or lint errors) |
| `npm start`         | Serve the production build                      |
| `npm run typecheck` | `tsc --noEmit` in every workspace               |
| `npm run lint`      | ESLint, including layer-boundary rules          |
| `npm run format`    | Prettier                                        |
| `npm run docker:*`  | `build` / `up` / `down` / `logs`                |

## ⚠️ Before launch

| What                                                                    | Where                         |
| ----------------------------------------------------------------------- | ----------------------------- |
| Set `RESEND_API_KEY` + `CONTACT_INBOX` — else **forms deliver nowhere** | `.env.local`                  |
| Verify your domain in Resend and set `RESEND_FROM`                      | `.env.local`                  |
| Set `NEXT_PUBLIC_SITE_URL` to the production origin                     | `.env.local` (build-time!)    |

`NEXT_PUBLIC_SITE_URL` is inlined into the client bundle at **build** time.
Changing it for a Docker deployment needs a rebuild, not a restart — which is
why compose passes it as a build arg.

## API

| Endpoint       | Method | Body                                          |
| -------------- | ------ | --------------------------------------------- |
| `/api/contact` | POST   | `name, email, company?, projectType, message` |
| `/api/careers` | POST   | `name, email, role, portfolioUrl?, message`   |
| `/api/health`  | GET    | Liveness probe for compose/load balancers     |

Responses: `201 {ok,id}` · `400 {ok:false,message,fieldErrors}` · `429` rate
limited · `502` delivery failed.

## Known limitations

- **Rate limiting is in-memory** — per-instance, resets on redeploy. Blunts
  casual spam, nothing more. Write a Redis adapter against the existing
  `RateLimiter` port before relying on it.
- **The honeypot is permissive by design.** `website` accepts any string in the
  schema so a tripped honeypot returns a normal success response instead of a
  400 naming the field. Do not "tighten" it to `z.literal('')` — that tells bots
  exactly which input gave them away.
- **Packages ship TypeScript source**, compiled by `transpilePackages`. Simple
  and avoids a build-order problem; if you later publish a package externally,
  it will need its own build step.
- **No test suite and no CI.** `npm run build` gates types and lint; wire it to
  a workflow.

## Accessibility

Skip link, one `<h1>` per page, `<main>` landmark, labelled controls with
`aria-describedby` error wiring and `role="alert"`, visible focus rings, and
`prefers-reduced-motion` honoured for both CSS and JS-driven motion.
