-- Flipzy waitlist + referral schema
create extension if not exists pgcrypto;

create table if not exists public.waitlist_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  university text,
  country text,
  referral_code text not null unique,
  referred_by text,
  referrals_count integer not null default 0,
  created_at timestamptz not null default now(),
  constraint waitlist_users_referral_code_format check (referral_code ~ '^[A-Z0-9]{6,10}$')
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_code text not null,
  referred_email text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_waitlist_users_rank on public.waitlist_users (referrals_count desc, created_at asc);
create index if not exists idx_waitlist_users_referred_by on public.waitlist_users (referred_by);
create index if not exists idx_referrals_referrer_code on public.referrals (referrer_code);

alter table public.waitlist_users enable row level security;
alter table public.referrals enable row level security;

-- Keep public surface minimal: no broad table selects, no public updates.
drop policy if exists "allow_waitlist_insert" on public.waitlist_users;
create policy "allow_waitlist_insert"
  on public.waitlist_users
  for insert
  to anon, authenticated
  with check (true);

-- The referrals table is written through security-definer function only.
drop policy if exists "deny_referrals_select" on public.referrals;
create policy "deny_referrals_select"
  on public.referrals
  for select
  to anon, authenticated
  using (false);

create or replace function public.generate_referral_code()
returns text
language plpgsql
as $$
declare
  v_code text;
begin
  loop
    v_code := upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 8));
    exit when not exists (
      select 1
      from public.waitlist_users
      where referral_code = v_code
    );
  end loop;

  return v_code;
end;
$$;

create or replace function public.signup_waitlist(
  p_email text,
  p_university text default null,
  p_country text default null,
  p_referred_by text default null
)
returns table (
  id uuid,
  email text,
  referral_code text,
  referrals_count integer,
  created_at timestamptz,
  was_created boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_referrer text;
  v_existing public.waitlist_users%rowtype;
  v_created public.waitlist_users%rowtype;
begin
  v_email := lower(trim(p_email));

  if v_email is null or v_email = '' then
    raise exception 'email is required';
  end if;

  select *
  into v_existing
  from public.waitlist_users
  where email = v_email
  limit 1;

  if found then
    return query
    select v_existing.id,
      v_existing.email,
      v_existing.referral_code,
      v_existing.referrals_count,
      v_existing.created_at,
      false;
    return;
  end if;

  if p_referred_by is not null and trim(p_referred_by) <> '' then
    select referral_code
    into v_referrer
    from public.waitlist_users
    where referral_code = upper(trim(p_referred_by))
    limit 1;
  end if;

  insert into public.waitlist_users (
    email,
    university,
    country,
    referral_code,
    referred_by
  )
  values (
    v_email,
    nullif(trim(p_university), ''),
    nullif(trim(p_country), ''),
    public.generate_referral_code(),
    v_referrer
  )
  returning * into v_created;

  if v_referrer is not null then
    update public.waitlist_users
    set referrals_count = referrals_count + 1
    where referral_code = v_referrer;

    insert into public.referrals (referrer_code, referred_email)
    values (v_referrer, v_created.email);
  end if;

  return query
  select v_created.id,
    v_created.email,
    v_created.referral_code,
    v_created.referrals_count,
    v_created.created_at,
    true;
end;
$$;

create or replace function public.get_waitlist_rank(p_email text)
returns table (
  email text,
  referral_code text,
  referrals_count integer,
  created_at timestamptz,
  rank bigint
)
language sql
security definer
set search_path = public
as $$
  with target as (
    select w.email, w.referral_code, w.referrals_count, w.created_at
    from public.waitlist_users w
    where w.email = lower(trim(p_email))
    limit 1
  )
  select t.email,
    t.referral_code,
    t.referrals_count,
    t.created_at,
    1 + (
      select count(*)
      from public.waitlist_users w
      where w.referrals_count > t.referrals_count
         or (w.referrals_count = t.referrals_count and w.created_at < t.created_at)
    ) as rank
  from target t;
$$;

create or replace function public.get_waitlist_leaderboard(p_limit integer default 10)
returns table (
  referral_code text,
  referrals_count integer
)
language sql
security definer
set search_path = public
as $$
  select w.referral_code, w.referrals_count
  from public.waitlist_users w
  order by w.referrals_count desc, w.created_at asc
  limit greatest(1, least(p_limit, 50));
$$;

grant execute on function public.signup_waitlist(text, text, text, text) to anon, authenticated;
grant execute on function public.get_waitlist_rank(text) to anon, authenticated;
grant execute on function public.get_waitlist_leaderboard(integer) to anon, authenticated;
