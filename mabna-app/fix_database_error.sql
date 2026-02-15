-- 1. DROP THE FAULTY TRIGGER (To unblock user creation)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- INSTRUCTIONS:
-- 1. Run this script first to remove the error.
-- 2. Go back to Authentication > Users and create the user 'almuhasibidormitory56@gmail.com' again. It should work now.

-- 3. AFTER creating the user, run the following command to manually create the Admin Profile:
-- (Select the lines below and run them)

insert into public.profiles (id, email, full_name, role)
select id, email, 'Admin Al-Muhasibi', 'admin'
from auth.users
where email = 'almuhasibidormitory56@gmail.com'
on conflict (id) do nothing;
