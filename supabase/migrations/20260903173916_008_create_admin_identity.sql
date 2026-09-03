/*
# Crear identity para el nuevo admin user
*/

INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
SELECT
  u.id::text,
  u.id,
  jsonb_build_object(
    'sub', u.id::text,
    'email', u.email,
    'email_verified', true
  ),
  'email',
  u.created_at,
  u.created_at,
  u.created_at
FROM auth.users u
WHERE u.email = 'admin@cybtrain.io'
  AND NOT EXISTS (SELECT 1 FROM auth.identities i WHERE i.user_id = u.id);
