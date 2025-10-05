-- Enable extensions if needed
create extension if not exists "uuid-ossp" with schema public;

-- Destinations
create table if not exists public.destinations (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  location text not null,
  short_description text not null,
  hero_image text,
  highlights jsonb default '[]'::jsonb,
  culture_tips jsonb default '[]'::jsonb,
  best_time text,
  estimated_price numeric
);
alter table public.destinations enable row level security;
create policy "destinations_select_public" on public.destinations
  for select using (true);
create policy "destinations_insert_public" on public.destinations
  for insert with check (true);

create index if not exists idx_destinations_slug on public.destinations (slug);
create index if not exists idx_destinations_location on public.destinations (location);

-- Hotels
create table if not exists public.hotels (
  id bigserial primary key,
  name text not null,
  destination_slug text not null references public.destinations(slug) on delete cascade,
  location text not null,
  rating numeric,
  price_per_night numeric,
  image text
);
alter table public.hotels enable row level security;
create policy "hotels_select_public" on public.hotels
  for select using (true);

create index if not exists idx_hotels_destination_slug on public.hotels (destination_slug);
create index if not exists idx_hotels_location on public.hotels (location);
create index if not exists idx_hotels_price on public.hotels (price_per_night);
create index if not exists idx_hotels_rating on public.hotels (rating);

-- Activities
create table if not exists public.activities (
  id bigserial primary key,
  title text not null,
  destination_slug text not null references public.destinations(slug) on delete cascade,
  summary text,
  price numeric,
  image text
);
alter table public.activities enable row level security;
create policy "activities_select_public" on public.activities
  for select using (true);

create index if not exists idx_activities_destination_slug on public.activities (destination_slug);
create index if not exists idx_activities_price on public.activities (price);

-- Bookings
create table if not exists public.bookings (
  id bigserial primary key,
  name text not null,
  type text not null check (type in ('flight','ship','hotel')),
  destination text not null,
  date date not null
);
alter table public.bookings enable row level security;
create policy "bookings_select_public" on public.bookings
  for select using (true);
create policy "bookings_insert_public" on public.bookings
  for insert with check (true);

create index if not exists idx_bookings_date on public.bookings (date);
