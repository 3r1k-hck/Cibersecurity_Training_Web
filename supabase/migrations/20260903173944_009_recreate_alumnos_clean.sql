/*
# Recrear todos los alumnos demo con identities correctas

Los alumnos demo fueron creados con INSERT manual en auth.users y
les falta el campo is_sso_user/is_anonymous que GoTree espera.
Tambien faltan identities (ya creadas en migration 006, pero los
usuarios se recrean aqui). Las sesiones se preservan.
*/

-- Guardar las sesiones antes de eliminar los usuarios
CREATE TEMP TABLE _temp_sessions AS
SELECT s.user_id, s.phishing_score, s.quiz_score, s.total_score, s.completed_at
FROM sessions s
JOIN auth.users u ON u.id = s.user_id
WHERE u.email IN (
  'maria.lopez@cybtrain.io', 'carlos.ruiz@cybtrain.io', 'laura.garcia@cybtrain.io',
  'javier.martinez@cybtrain.io', 'ana.fernandez@cybtrain.io', 'diego.sanchez@cybtrain.io'
);

-- Guardar last_active de los perfiles
CREATE TEMP TABLE _temp_profiles AS
SELECT p.id, p.username, p.role, p.created_at, p.last_active
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email IN (
  'maria.lopez@cybtrain.io', 'carlos.ruiz@cybtrain.io', 'laura.garcia@cybtrain.io',
  'javier.martinez@cybtrain.io', 'ana.fernandez@cybtrain.io', 'diego.sanchez@cybtrain.io'
);

-- Eliminar y recrear cada alumno
DO $$
DECLARE
  alum_email text;
  alum_username text;
  alum_role text;
  alum_last_active timestamptz;
  new_id uuid;
BEGIN
  FOR alum_email, alum_username, alum_role, alum_last_active IN
    SELECT u.email, p.username, p.role, p.last_active
    FROM auth.users u
    JOIN profiles p ON p.id = u.id
    WHERE u.email IN (
      'maria.lopez@cybtrain.io', 'carlos.ruiz@cybtrain.io', 'laura.garcia@cybtrain.io',
      'javier.martinez@cybtrain.io', 'ana.fernandez@cybtrain.io', 'diego.sanchez@cybtrain.io'
    )
  LOOP
    -- Guardar datos antes de eliminar
    SELECT p.last_active INTO alum_last_active FROM profiles p WHERE p.username = alum_username;

    -- Eliminar usuario (cascade elimina identities, perfiles, sesiones)
    DELETE FROM auth.users WHERE email = alum_email;

    -- Recrear usuario limpio
    new_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_id,
      'authenticated', 'authenticated',
      alum_email,
      crypt('alumno123', gen_salt('bf', 10)),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('username', alum_username),
      false, false
    );

    -- Crear identity
    INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    VALUES (
      new_id::text, new_id,
      jsonb_build_object('sub', new_id::text, 'email', alum_email, 'email_verified', true),
      'email', now(), now(), now()
    );

    -- Crear perfil
    INSERT INTO profiles (id, username, role, last_active)
    VALUES (new_id, alum_username, alum_role, COALESCE(alum_last_active, now()))
    ON CONFLICT (id) DO NOTHING;

    -- Restaurar sesiones
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at)
    SELECT new_id, phishing_score, quiz_score, total_score, completed_at
    FROM _temp_sessions ts
    JOIN _temp_profiles tp ON tp.id = ts.user_id
    WHERE tp.username = alum_username;
  END LOOP;
END $$;
