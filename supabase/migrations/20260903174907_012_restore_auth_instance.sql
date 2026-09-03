/*
# Restaurar instancia de GoTree y limpiar usuarios de prueba

GoTree necesita una entrada en auth.instances. La restauramos con el
instance_id que todos los usuarios usan: 00000000-0000-0000-0000-000000000000
*/

INSERT INTO auth.instances (id, uuid, raw_base_config, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  '{"site_url":"https://ukmxzntnstcwxuixilug.supabase.co","security":{"password_change_required":false},"mailer":{"autoconfirm":true},"rate_limit":{"anonymous":{"requests":30,"duration":"60s"},"authenticated":{"requests":30,"duration":"60s"}},"sessions":{"timebox":"720h","inactivity_timeout":"24h"}}',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;
