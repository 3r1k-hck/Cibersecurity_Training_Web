/*
# Fix admin password hash

El usuario admin@cybtrain.io existia pero su hash bcrypt fue creado con
gen_salt('bf') que usa cost factor 6. GoTrue (Supabase Auth) espera cost
factor 10. Esto causa el error "Database error querying schema" al
intentar iniciar sesion.

Esta migracion re-hashea la contrasena con el cost factor correcto.
*/

UPDATE auth.users
SET encrypted_password = crypt('admin123456', gen_salt('bf', 10)),
    updated_at = now()
WHERE email = 'admin@cybtrain.io';
