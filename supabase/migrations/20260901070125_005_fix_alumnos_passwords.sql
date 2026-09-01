/*
# Fix demo alumnos password hashes

Las contrasenas de los alumnos demo fueron creadas con gen_salt('bf')
(cost factor 6). GoTrue espera cost factor 10. Re-hashear todas.
*/

UPDATE auth.users
SET encrypted_password = crypt('alumno123', gen_salt('bf', 10)),
    updated_at = now()
WHERE email IN (
  'maria.lopez@cybtrain.io',
  'carlos.ruiz@cybtrain.io',
  'laura.garcia@cybtrain.io',
  'javier.martinez@cybtrain.io',
  'ana.fernandez@cybtrain.io',
  'diego.sanchez@cybtrain.io'
);
