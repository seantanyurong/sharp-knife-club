# Database

Application tables that aren't managed by another tool.

Two databases are in play, and it matters which is which:

| | Connection | Holds |
| --- | --- | --- |
| **Neon** | `DATABASE_URL` | better-auth tables (`user`, `session`, `account`, `verification`) and everything in `migrations/` |
| **Supabase** | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | analytics tables (`whatsapp_clicks`, …), written via `lib/server/supabase.ts` |

App code reaches Neon through the pool in `lib/server/db.ts`. `DATABASE_URL`
points at Neon's pooled (`-pooler`) endpoint, so the per-instance pool is kept
small — each warm serverless instance holds its own.

## Migrations

Plain `.sql` files, applied by hand. There is no runner and no tracking table,
so **nothing enforces that these files match the live database** — treat them as
the record of what was applied, and keep them accurate.

Conventions:

- Number them in order: `001_`, `002_`, …
- Never edit an applied file. `create table if not exists` will silently skip an
  amended definition, so a new column needs its own file with an `alter table`.
- Keep them idempotent (`if not exists`, `create or replace`) so a re-run is safe.

To apply one, paste it into the Neon SQL editor, or run it locally against
`DATABASE_URL` with `pg` — wrap it in a transaction so a failure rolls back
rather than leaving the schema half-applied.

### `001_quote_rate_limit.sql`

Per-IP rate limiting for `POST /api/quote/analyze`, which spends OpenAI credit
and so can't be left open to the internet. Applied 2026-09-13.

- **`quote_rate_limit`** — one row per hashed IP. Two independent windows: a
  short burst window and a rolling daily one. IPs are stored as an HMAC keyed
  with `QUOTE_IP_SALT`, never in the clear (an unsalted hash of an IPv4 address
  is trivially reversible — the whole space is only 2³²).
- **`check_quote_rate_limit(...)`** — rolls expired windows, decides, and counts
  the request in a single statement. The row lock it takes is what stops
  concurrent requests for one IP racing past the cap; a read-then-write in
  application code would leak. Returns `(allowed, retry_after_seconds, reason)`.

Limits live in `lib/server/rateLimit.ts`, not in the schema — they're passed in
as arguments, so changing them needs no migration. That module also decides what
happens when the database is unreachable (currently: fail open).

Rows accumulate one per IP indefinitely. There's an index on `updated_at` ready
for a cleanup job; nothing runs one yet.
