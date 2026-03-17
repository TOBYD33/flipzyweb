-- Simple waitlist table for name + email capture
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Anyone (anon) can insert their own signup
create policy "anon_can_insert_waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

-- Service role can read all entries (bypasses RLS by default, but explicit for clarity)
-- No select policy for anon — entries are not publicly readable
