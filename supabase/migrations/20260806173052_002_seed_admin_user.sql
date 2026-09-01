/*
# Crear usuario administrador inicial

Crea el usuario admin@cybtrain.io en auth.users con contraseña hashed,
y su perfil correspondiente con rol 'admin'.

Este usuario permite acceder al panel de administración sin necesidad
de registrarse manualmente la primera vez.

Credenciales:
- Correo: admin@cybtrain.io
- Contraseña: admin123456
*/

-- Insert admin user into auth.users with properly hashed password
-- Using Supabase's internal function to create the user
DO $$
DECLARE
  admin_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@cybtrain.io';
  
  IF admin_id IS NULL THEN
    -- Create the auth user with a properly hashed password
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
      raw_user_meta_data
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@cybtrain.io',
      crypt('admin123456', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"username":"admin"}'::jsonb
    )
    RETURNING id INTO admin_id;

    -- Create the profile (the trigger should do this, but we ensure it here too)
    INSERT INTO profiles (id, username, role)
    VALUES (admin_id, 'admin', 'admin')
    ON CONFLICT (id) DO NOTHING;
    
    RAISE NOTICE 'Admin user created with id: %', admin_id;
  ELSE
    RAISE NOTICE 'Admin user already exists with id: %', admin_id;
  END IF;
END $$;
