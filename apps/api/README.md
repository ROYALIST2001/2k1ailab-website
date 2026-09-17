# apps/api — reserved

Intentionally empty. This directory marks where a backend service goes.

There is **no `package.json` here on purpose** — the root `workspaces` glob is
`apps/*`, and npm skips directories without a manifest. Adding one is what
turns this slot into a real workspace.

## Why the slot exists

The web app already treats delivery as a pluggable port. `@company/application`
defines `SubmissionSink`; `@company/infrastructure` ships an `HttpSubmissionSink`
that POSTs to `${BACKEND_API_URL}/submissions`. So a backend can be introduced
without touching a single route, form or component — set `BACKEND_API_URL` and
the web app starts forwarding.

## When you fill it in

1. Add `apps/api/package.json` named `@company/api`.
2. Reuse the existing layers rather than duplicating them — depend on
   `@company/domain`, `@company/contracts` and `@company/application`. The
   validation schemas and use cases are deliberately framework-free so a plain
   Node service can import them as-is.
3. Implement `POST /submissions` against the `@company/contracts` schemas.
4. Add `docker/Dockerfile.api` and uncomment the `api` service in
   `docker/docker-compose.yml`.
5. Set `BACKEND_API_URL=http://api:3001` on the web service.

Note that `apps/api/**` is currently in the root ESLint `ignores` list — remove
that entry once there is code here.
