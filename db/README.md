# db — reserved

Intentionally empty. This directory marks where schema and migrations go.

Nothing in the current system persists anything: submissions are logged by the
console sink, or forwarded to an external backend by the HTTP sink. There is no
database, no ORM and no migration tooling — adding those before there is a
reason to store data would be infrastructure to maintain for no benefit.

## When you fill it in

Expected layout:

```
db/
├── migrations/     # ordered, checked-in migration files
├── seed/           # development seed data
└── schema.sql      # or schema.prisma / drizzle schema
```

Then:

1. Uncomment the `db` service in `docker/docker-compose.yml` (a Postgres 17
   service with a healthcheck and named volume is already drafted there).
2. Put the persistence adapter in `@company/infrastructure` — implement the
   existing `SubmissionSink` port with something like `PostgresSubmissionSink`,
   and register it in `apps/web/src/server/container.ts`.

Keep SQL and ORM types out of `@company/domain`. The domain describes what a
submission _is_; how it is stored is an infrastructure detail, and that
separation is what lets the storage choice change later.
