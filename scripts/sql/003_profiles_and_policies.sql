-- Profiles table to store roles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamp with time zone default now()
);
alter table public.profiles enable row level security;

-- Each user can select and upsert their own profile
create policy if not exists "Profiles: Select own"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "Profiles: Upsert own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy if not exists "Profiles: Update own"
  on public.profiles for update
  using (auth.uid() = id);

-- Destinations read open to all (for browsing)
alter table public.destinations enable row level security;
drop policy if exists "Destinations: Select all" on public.destinations;
create policy "Destinations: Select all"
  on public.destinations for select
  using (true);

-- Only admins can insert/update/delete destinations
drop policy if exists "Destinations: Admin write" on public.destinations;
create policy "Destinations: Admin write"
  on public.destinations for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- Bookings RLS: users can see/create their own; admins can see all
alter table public.bookings enable row level security;

drop policy if exists "Bookings: Select own" on public.bookings;
create policy "Bookings: Select own"
  on public.bookings for select
  using (auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

drop policy if exists "Bookings: Insert own" on public.bookings;
create policy "Bookings: Insert own"
  on public.bookings for insert
  with check (auth.uid() = user_id);

drop policy if exists "Bookings: Update admin" on public.bookings;
create policy "Bookings: Update admin"
  on public.bookings for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

drop policy if exists "Bookings: Delete admin" on public.bookings;
create policy "Bookings: Delete admin"
  on public.bookings for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
