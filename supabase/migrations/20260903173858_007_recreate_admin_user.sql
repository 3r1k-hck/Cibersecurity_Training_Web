/*
# Recrear admin user completamente

El usuario admin fue creado con INSERT manual en auth.users, lo que
deja campos incompletos que causan "Database error querying schema".
Esta migracion elimina y recrea el usuario desde cero.
*/

-- Eliminar el usuario admin completamente (cascade elimina identities y perfiles)
DELETE FROM auth.users WHERE email = 'admin@cybtrain.io';

-- Recrear con todos los campos que GoTree espera
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_sso_user,
  is_anonymous
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@cybtrain.io',
  crypt('admin123456', gen_salt('bf', 10)),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"username":"admin"}'::jsonb,
  false,
  false
);
