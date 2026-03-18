-- ─── Waitlist ─────────────────────────────────────────────────────────────────
-- Replaces Notion. Deduplicates on email.

create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  first_name  text not null,
  last_name   text not null,
  source      text,
  page_path   text,
  created_at  timestamptz not null default now()
);

alter table waitlist enable row level security;

-- No public reads or writes — all access via service role from API routes
create policy "service role only" on waitlist
  using (false);


-- ─── Contact submissions ───────────────────────────────────────────────────────
-- Backs the contact form (currently a dead UI — will be wired up).

create table if not exists contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  message       text not null,
  created_at    timestamptz not null default now(),
  responded_at  timestamptz
);

alter table contact_submissions enable row level security;

create policy "service role only" on contact_submissions
  using (false);
