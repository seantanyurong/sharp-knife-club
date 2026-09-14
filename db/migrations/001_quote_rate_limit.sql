-- Per-IP rate limiting for POST /api/quote/analyze.
--
-- One row per hashed IP, holding two independent windows: a short burst window
-- and a rolling daily window. IPs are stored as an HMAC (see QUOTE_IP_SALT),
-- never in the clear.
--
-- Runs against DATABASE_URL (Neon), the same database better-auth uses.
-- Idempotent: safe to re-run.

create table if not exists quote_rate_limit (
  ip_hash            text primary key,
  short_count        integer     not null default 0,
  short_window_start timestamptz not null default now(),
  day_count          integer     not null default 0,
  day_window_start   timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Lets a cleanup job drop rows nobody has touched in a while.
create index if not exists quote_rate_limit_updated_at_idx
  on quote_rate_limit (updated_at);

/**
 * Atomically roll expired windows, decide, and count the request.
 *
 * Atomicity matters: the INSERT ... ON CONFLICT DO UPDATE takes a row lock that
 * is held until this function's transaction commits, so concurrent callers for
 * the same IP serialise here instead of racing past the limit.
 *
 * Returns one row: whether to allow, how long until the caller may retry, and
 * which limit was hit ('ok' | 'burst' | 'daily').
 */
create or replace function check_quote_rate_limit(
  p_ip_hash      text,
  p_short_limit  integer,
  p_short_window interval,
  p_day_limit    integer,
  p_day_window   interval
)
returns table (allowed boolean, retry_after_seconds integer, reason text)
language plpgsql
as $$
declare
  rec    quote_rate_limit%rowtype;
  now_ts timestamptz := now();
begin
  insert into quote_rate_limit as q (ip_hash, short_window_start, day_window_start)
  values (p_ip_hash, now_ts, now_ts)
  on conflict (ip_hash) do update set
    -- Reset a window only once it has fully elapsed.
    short_count = case
      when q.short_window_start + p_short_window <= now_ts then 0
      else q.short_count end,
    short_window_start = case
      when q.short_window_start + p_short_window <= now_ts then now_ts
      else q.short_window_start end,
    day_count = case
      when q.day_window_start + p_day_window <= now_ts then 0
      else q.day_count end,
    day_window_start = case
      when q.day_window_start + p_day_window <= now_ts then now_ts
      else q.day_window_start end,
    updated_at = now_ts
  returning * into rec;

  -- Daily cap first: it is the one worth reporting, and its retry window is
  -- the longer of the two.
  if rec.day_count >= p_day_limit then
    return query select
      false,
      greatest(
        1,
        ceil(extract(epoch from (rec.day_window_start + p_day_window - now_ts)))::integer
      ),
      'daily'::text;
    return;
  end if;

  if rec.short_count >= p_short_limit then
    return query select
      false,
      greatest(
        1,
        ceil(extract(epoch from (rec.short_window_start + p_short_window - now_ts)))::integer
      ),
      'burst'::text;
    return;
  end if;

  -- Allowed: count it. Rejected requests are deliberately NOT counted, so a
  -- blocked caller waits out a fixed window rather than extending it forever.
  update quote_rate_limit
     set short_count = rec.short_count + 1,
         day_count   = rec.day_count + 1,
         updated_at  = now_ts
   where ip_hash = p_ip_hash;

  return query select true, 0, 'ok'::text;
end;
$$;
