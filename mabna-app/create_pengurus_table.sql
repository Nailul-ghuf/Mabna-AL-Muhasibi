-- Create PENGURUS table (for Management Team)
create table if not exists pengurus (
  id uuid default uuid_generate_v4() primary key,
  nama text not null,
  jabatan text,
  asal text,
  jurusan text,
  devisi text,
  foto text,
  kategori text default 'TAMBAHAN', -- 'UTAMA' or 'TAMBAHAN'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table pengurus enable row level security;

-- Policies
create policy "Pengurus viewable by everyone" on pengurus for select using (true);
create policy "Admins can insert pengurus" on pengurus for insert with check (auth.role() = 'authenticated');
create policy "Admins can update pengurus" on pengurus for update using (auth.role() = 'authenticated');
create policy "Admins can delete pengurus" on pengurus for delete using (auth.role() = 'authenticated');

-- Storage Bucket for Profile Images
insert into storage.buckets (id, name, public) values ('profile-images', 'profile-images', true) on conflict do nothing;

create policy "Public Access Profiles" on storage.objects for select using ( bucket_id = 'profile-images' );
create policy "Auth Upload Profiles" on storage.objects for insert with check ( bucket_id = 'profile-images' and auth.role() = 'authenticated' );
create policy "Auth Update Profiles" on storage.objects for update using ( bucket_id = 'profile-images' and auth.role() = 'authenticated' );
create policy "Auth Delete Profiles" on storage.objects for delete using ( bucket_id = 'profile-images' and auth.role() = 'authenticated' );
