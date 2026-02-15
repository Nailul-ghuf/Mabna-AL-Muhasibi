-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Tables

-- PROFILES (Admins)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  full_name text,
  role text default 'admin', -- 'superadmin', 'admin'
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- PROGRAMS (Featured)
create table if not exists programs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  icon_name text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ACTIVITIES (News/Events)
create table if not exists activities (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique,
  content text,
  image_url text,
  event_date date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- SCHEDULES
create table if not exists schedules (
  id uuid default uuid_generate_v4() primary key,
  day text not null, -- 'Senin', 'Selasa', etc.
  time_start time not null,
  time_end time not null,
  activity_name text not null,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- GALLERY
create table if not exists gallery (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  caption text,
  category text, -- 'Kegiatan', 'Fasilitas'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Storage Buckets
-- Note: You have to create buckets manually in dashboard usually, but this inserts if using storage-api
insert into storage.buckets (id, name, public) values ('activity-images', 'activity-images', true) on conflict do nothing;

-- 3. Row Level Security (RLS)

-- Profiles: Viewable by everyone (or just admins), editable by self
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Programs: Viewable by everyone, editable by admins
alter table programs enable row level security;
create policy "Programs are viewable by everyone" on programs for select using (true);
create policy "Admins can insert programs" on programs for insert with check (auth.role() = 'authenticated');
create policy "Admins can update programs" on programs for update using (auth.role() = 'authenticated');
create policy "Admins can delete programs" on programs for delete using (auth.role() = 'authenticated');

-- Activities: Viewable by everyone, editable by admins
alter table activities enable row level security;
create policy "Activities are viewable by everyone" on activities for select using (true);
create policy "Admins can insert activities" on activities for insert with check (auth.role() = 'authenticated');
create policy "Admins can update activities" on activities for update using (auth.role() = 'authenticated');
create policy "Admins can delete activities" on activities for delete using (auth.role() = 'authenticated');

-- Schedules: Viewable by everyone, editable by admins
alter table schedules enable row level security;
create policy "Schedules are viewable by everyone" on schedules for select using (true);
create policy "Admins can insert schedules" on schedules for insert with check (auth.role() = 'authenticated');
create policy "Admins can update schedules" on schedules for update using (auth.role() = 'authenticated');
create policy "Admins can delete schedules" on schedules for delete using (auth.role() = 'authenticated');

-- Gallery: Viewable by everyone, editable by admins
alter table gallery enable row level security;
create policy "Gallery viewable by everyone" on gallery for select using (true);
create policy "Admins can insert gallery" on gallery for insert with check (auth.role() = 'authenticated');
create policy "Admins can update gallery" on gallery for update using (auth.role() = 'authenticated');
create policy "Admins can delete gallery" on gallery for delete using (auth.role() = 'authenticated');

-- Storage Policies
create policy "Public Access" on storage.objects for select using ( bucket_id = 'activity-images' );
create policy "Authenticated Upload" on storage.objects for insert with check ( bucket_id = 'activity-images' and auth.role() = 'authenticated' );
create policy "Authenticated Update" on storage.objects for update using ( bucket_id = 'activity-images' and auth.role() = 'authenticated' );
create policy "Authenticated Delete" on storage.objects for delete using ( bucket_id = 'activity-images' and auth.role() = 'authenticated' );

-- 4. Create Admin User (Logic)
-- WARNING: You cannot easily create a user with a specific password via raw SQL because passwords are hashed.
-- The best way is to Sign Up via the App or use the Supabase Dashboard > Authentication > Add User.

-- HOWEVER, we can auto-create the profile trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'admin');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- INSTRUCTIONS FOR USER:
-- 1. Run this script in Supabase SQL Editor.
-- 2. Go to Authentication > Users > Add User.
-- 3. Enter Email: almuhasibidormitory56@gmail.com
-- 4. Enter Password: muhasibian56
-- 5. Enable "Auto Confirm User".
-- 6. Click "Create User".
