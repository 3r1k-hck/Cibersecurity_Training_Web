/*
# Crear instancia de GoTree faltante

La tabla auth.instances esta vacia, lo que causa que GoTree falle con
"Database error querying schema" en cualquier operacion de auth.
Los usuarios existentes tienen instance_id = '00000000-0000-0000-0000-000000000000',
por lo que creamos una instancia con ese ID.
*/

INSERT INTO auth.instances (id, uuid, raw_base_config, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  '{"site_url":"http://localhost:3000","security":{"password_change_required":false},"mailer":{"autoconfirm":true},"rate_limit":{"anonymous":{"requests":30,"duration":"60s"},"authenticated":{"requests":30,"duration":"60s"}},"sessions":{"timebox":"720h","inactivity_timeout":"24h"}}',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;
