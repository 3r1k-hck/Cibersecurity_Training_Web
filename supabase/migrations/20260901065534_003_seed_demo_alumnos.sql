/*
# Crear alumnos de demostracion con sesiones y puntuaciones

Crea 6 usuarios alumnos en auth.users con sus perfiles y sesiones
de entrenamiento con puntuaciones variadas, para que el panel de
administracion muestre datos realistas.

El trigger on_auth_user_created crea automaticamente el perfil,
por lo que no se insertan perfiles manualmente.

## Usuarios creados
- maria.lopez@cybtrain.io - 3 sesiones (8, 6, 10 puntos)
- carlos.ruiz@cybtrain.io - 1 sesion (15 puntos)
- laura.garcia@cybtrain.io - 2 sesiones (22, 25 puntos) - mejor alumna
- javier.martinez@cybtrain.io - 3 sesiones (5, 9, 3 puntos)
- ana.fernandez@cybtrain.io - 2 sesiones (18, 20 puntos)
- diego.sanchez@cybtrain.io - 3 sesiones (12, 14, 19 puntos)

Todos con contrasena: alumno123
*/

DO $$
DECLARE
  u_id uuid;
BEGIN
  -- Maria Lopez
  SELECT id INTO u_id FROM auth.users WHERE email = 'maria.lopez@cybtrain.io';
  IF u_id IS NULL THEN
    u_id := gen_random_uuid();
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    VALUES ('00000000-0000-0000-0000-000000000000', u_id, 'authenticated', 'authenticated', 'maria.lopez@cybtrain.io', crypt('alumno123', gen_salt('bf')), now(), now() - interval '25 days', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"username":"maria.lopez"}'::jsonb);
    INSERT INTO profiles (id, username, role) VALUES (u_id, 'maria.lopez', 'user') ON CONFLICT (id) DO NOTHING;
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 4, 4, 8, now() - interval '24 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 3, 3, 6, now() - interval '20 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 5, 5, 10, now() - interval '15 days');
    UPDATE profiles SET last_active = now() - interval '15 days' WHERE id = u_id;
  END IF;

  -- Carlos Ruiz
  SELECT id INTO u_id FROM auth.users WHERE email = 'carlos.ruiz@cybtrain.io';
  IF u_id IS NULL THEN
    u_id := gen_random_uuid();
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    VALUES ('00000000-0000-0000-0000-000000000000', u_id, 'authenticated', 'authenticated', 'carlos.ruiz@cybtrain.io', crypt('alumno123', gen_salt('bf')), now(), now() - interval '22 days', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"username":"carlos.ruiz"}'::jsonb);
    INSERT INTO profiles (id, username, role) VALUES (u_id, 'carlos.ruiz', 'user') ON CONFLICT (id) DO NOTHING;
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 8, 7, 15, now() - interval '18 days');
    UPDATE profiles SET last_active = now() - interval '18 days' WHERE id = u_id;
  END IF;

  -- Laura Garcia (mejor alumna)
  SELECT id INTO u_id FROM auth.users WHERE email = 'laura.garcia@cybtrain.io';
  IF u_id IS NULL THEN
    u_id := gen_random_uuid();
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    VALUES ('00000000-0000-0000-0000-000000000000', u_id, 'authenticated', 'authenticated', 'laura.garcia@cybtrain.io', crypt('alumno123', gen_salt('bf')), now(), now() - interval '20 days', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"username":"laura.garcia"}'::jsonb);
    INSERT INTO profiles (id, username, role) VALUES (u_id, 'laura.garcia', 'user') ON CONFLICT (id) DO NOTHING;
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 11, 11, 22, now() - interval '16 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 12, 13, 25, now() - interval '5 days');
    UPDATE profiles SET last_active = now() - interval '5 days' WHERE id = u_id;
  END IF;

  -- Javier Martinez (peor desempeno)
  SELECT id INTO u_id FROM auth.users WHERE email = 'javier.martinez@cybtrain.io';
  IF u_id IS NULL THEN
    u_id := gen_random_uuid();
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    VALUES ('00000000-0000-0000-0000-000000000000', u_id, 'authenticated', 'authenticated', 'javier.martinez@cybtrain.io', crypt('alumno123', gen_salt('bf')), now(), now() - interval '28 days', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"username":"javier.martinez"}'::jsonb);
    INSERT INTO profiles (id, username, role) VALUES (u_id, 'javier.martinez', 'user') ON CONFLICT (id) DO NOTHING;
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 3, 2, 5, now() - interval '27 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 5, 4, 9, now() - interval '21 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 2, 1, 3, now() - interval '10 days');
    UPDATE profiles SET last_active = now() - interval '10 days' WHERE id = u_id;
  END IF;

  -- Ana Fernandez
  SELECT id INTO u_id FROM auth.users WHERE email = 'ana.fernandez@cybtrain.io';
  IF u_id IS NULL THEN
    u_id := gen_random_uuid();
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    VALUES ('00000000-0000-0000-0000-000000000000', u_id, 'authenticated', 'authenticated', 'ana.fernandez@cybtrain.io', crypt('alumno123', gen_salt('bf')), now(), now() - interval '14 days', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"username":"ana.fernandez"}'::jsonb);
    INSERT INTO profiles (id, username, role) VALUES (u_id, 'ana.fernandez', 'user') ON CONFLICT (id) DO NOTHING;
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 9, 9, 18, now() - interval '12 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 10, 10, 20, now() - interval '3 days');
    UPDATE profiles SET last_active = now() - interval '3 days' WHERE id = u_id;
  END IF;

  -- Diego Sanchez
  SELECT id INTO u_id FROM auth.users WHERE email = 'diego.sanchez@cybtrain.io';
  IF u_id IS NULL THEN
    u_id := gen_random_uuid();
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
    VALUES ('00000000-0000-0000-0000-000000000000', u_id, 'authenticated', 'authenticated', 'diego.sanchez@cybtrain.io', crypt('alumno123', gen_salt('bf')), now(), now() - interval '18 days', now(), '{"provider":"email","providers":["email"]}'::jsonb, '{"username":"diego.sanchez"}'::jsonb);
    INSERT INTO profiles (id, username, role) VALUES (u_id, 'diego.sanchez', 'user') ON CONFLICT (id) DO NOTHING;
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 6, 6, 12, now() - interval '17 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 7, 7, 14, now() - interval '11 days');
    INSERT INTO sessions (user_id, phishing_score, quiz_score, total_score, completed_at) VALUES (u_id, 10, 9, 19, now() - interval '2 days');
    UPDATE profiles SET last_active = now() - interval '2 days' WHERE id = u_id;
  END IF;
END $$;
