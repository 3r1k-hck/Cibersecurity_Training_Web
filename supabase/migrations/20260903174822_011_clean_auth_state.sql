/*
# Limpiar estado de auth y restaurar instancia original

El problema raiz es que insertamos manualmente en auth.users, lo que
corrompe el estado interno de GoTree. Vamos a:
1. Eliminar la instancia que creamos manualmente
2. Eliminar todos los usuarios creados manualmente
3. Restaurar todo via Admin API en una edge function
*/

-- Eliminar la instancia manual (GoTree la gestiona internamente)
DELETE FROM auth.instances WHERE id = '00000000-0000-0000-0000-000000000000';

-- Eliminar todos los usuarios (cascade elimina identities, perfiles, sesiones)
DELETE FROM auth.users WHERE email IN (
  'admin@cybtrain.io',
  'maria.lopez@cybtrain.io',
  'carlos.ruiz@cybtrain.io',
  'laura.garcia@cybtrain.io',
  'javier.martinez@cybtrain.io',
  'ana.fernandez@cybtrain.io',
  'diego.sanchez@cybtrain.io',
  'erick@cybtrain.io'
);
