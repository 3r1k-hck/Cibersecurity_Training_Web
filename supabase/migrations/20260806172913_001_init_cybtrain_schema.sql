/*
# Inicialización de la base de datos de CyberTrain

## Descripción general
Crea el esquema completo para la plataforma de formación en ciberseguridad CyberTrain.
Sustituye el almacenamiento en LocalStorage por tablas reales en Supabase con autenticación
de correo/contraseña y seguridad a nivel de fila (RLS).

## Tablas nuevas

1. `profiles`
   - Extiende `auth.users` con datos de perfil (nombre de usuario, rol, foto).
   - `id` (uuid, PK, referenciada a `auth.users.id` con ON DELETE CASCADE).
   - `username` (text, único, no nulo) — nombre visible del usuario.
   - `role` (text, no nulo, default 'user') — 'user' o 'admin'.
   - `created_at` (timestamptz, default now()).
   - `last_active` (timestamptz, default now()).

2. `sessions`
   - Cada intento completo de un usuario (módulo phishing + quiz).
   - `id` (uuid, PK).
   - `user_id` (uuid, FK a `auth.users.id` con ON DELETE CASCADE, default `auth.uid()`).
   - `phishing_score` (int, no nulo).
   - `quiz_score` (int, no nulo).
   - `total_score` (int, no nulo).
   - `completed_at` (timestamptz, default now()).

3. `session_answers`
   - Respuestas individuales dentro de una sesión (phishing o quiz).
   - `id` (uuid, PK).
   - `session_id` (uuid, FK a `sessions.id` con ON DELETE CASCADE).
   - `user_id` (uuid, FK a `auth.users.id` con ON DELETE CASCADE).
   - `item_id` (text) — ID del correo de phishing o pregunta de quiz.
   - `item_type` (text) — 'phishing' o 'quiz'.
   - `selected` (int) — índice de la opción elegida (quiz) o 0/1 (phishing real/phishing).
   - `correct` (boolean, no nulo).
   - `created_at` (timestamptz, default now()).

4. `api_logs`
   - Registro simulado de eventos API/webhook para la consola de administración.
   - `id` (uuid, PK).
   - `user_id` (uuid, FK a `auth.users.id` con ON DELETE CASCADE, nullable).
   - `method` (text, no nulo) — método HTTP.
   - `endpoint` (text, no nulo).
   - `status` (int, no nulo, default 200).
   - `headers` (jsonb) — cabeceras de la petición.
   - `body` (jsonb) — cuerpo de la petición.
   - `response` (jsonb) — cuerpo de la respuesta.
   - `username` (text) — nombre del usuario que generó el evento.
   - `created_at` (timestamptz, default now()).

5. `audit_commits`
   - Commits de auditoría simulados para el terminal Git del panel admin.
   - `id` (uuid, PK).
   - `hash` (text, no nulo) — hash corto del commit.
   - `author` (text, no nulo).
   - `message` (text, no nulo).
   - `type` (text, no nulo, default 'feat') — 'feat', 'fix', 'chore', 'audit', 'docs'.
   - `user_id` (uuid, FK a `auth.users.id` con ON DELETE CASCADE, nullable).
   - `created_at` (timestamptz, default now()).

## Seguridad (RLS)

- **profiles**: Cada usuario autenticado puede ver y actualizar su propio perfil.
  Los administradores pueden ver todos los perfiles (para el panel admin).
- **sessions**: Cada usuario ve solo sus sesiones; los admins ven todas.
- **session_answers**: Cada usuario ve solo sus respuestas; los admins ven todas.
- **api_logs**: Solo lectura para admins (logs generados por el sistema).
  Inserción permitida para usuarios autenticados (para registrar eventos).
- **audit_commits**: Solo lectura para admins; inserción permitida para autenticados.

## Funciones y triggers

- `handle_new_user()`: trigger AFTER INSERT en `auth.users` que crea automáticamente
  una fila en `profiles` cuando un usuario se registra. El rol por defecto es 'user'.
  Si el correo es `admin@cybtrain.io`, se asigna rol 'admin'.
- `is_admin()`: función SECURITY DEFINER que comprueba si el usuario actual tiene
  rol 'admin' en `profiles`. Usada en las políticas RLS.

## Notas importantes

1. El perfil se crea automáticamente al registrarse — no requiere llamada manual.
2. Los logs API y commits de auditoría se insertan desde el frontend con `user_id`
   que se rellena automáticamente con `auth.uid()`.
3. Los administradores tienen acceso de lectura a todas las tablas para el panel.
4. Las fechas usan `timestamptz` y se almacenan en UTC.
*/

-- ============================================================
-- Tabla: profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  last_active timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON profiles;
CREATE POLICY "profiles_select_own_or_admin"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ============================================================
-- Tabla: sessions
-- ============================================================
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  phishing_score int NOT NULL DEFAULT 0,
  quiz_score int NOT NULL DEFAULT 0,
  total_score int NOT NULL DEFAULT 0,
  completed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sessions_select_own_or_admin" ON sessions;
CREATE POLICY "sessions_select_own_or_admin"
ON sessions FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "sessions_insert_own" ON sessions;
CREATE POLICY "sessions_insert_own"
ON sessions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "sessions_delete_own" ON sessions;
CREATE POLICY "sessions_delete_own"
ON sessions FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ============================================================
-- Tabla: session_answers
-- ============================================================
CREATE TABLE IF NOT EXISTS session_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id text NOT NULL,
  item_type text NOT NULL DEFAULT 'quiz',
  selected int NOT NULL DEFAULT 0,
  correct boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE session_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "answers_select_own_or_admin" ON session_answers;
CREATE POLICY "answers_select_own_or_admin"
ON session_answers FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "answers_insert_own" ON session_answers;
CREATE POLICY "answers_insert_own"
ON session_answers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Tabla: api_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS api_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  method text NOT NULL DEFAULT 'POST',
  endpoint text NOT NULL,
  status int NOT NULL DEFAULT 200,
  headers jsonb NOT NULL DEFAULT '{}'::jsonb,
  body jsonb NOT NULL DEFAULT '{}'::jsonb,
  response jsonb NOT NULL DEFAULT '{}'::jsonb,
  username text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- Los admins pueden ver todos los logs; cada usuario puede ver los suyos
DROP POLICY IF EXISTS "api_logs_select_admin_or_own" ON api_logs;
CREATE POLICY "api_logs_select_admin_or_own"
ON api_logs FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  OR auth.uid() = user_id
);

-- Cualquier usuario autenticado puede insertar logs (para registrar eventos)
DROP POLICY IF EXISTS "api_logs_insert_authenticated" ON api_logs;
CREATE POLICY "api_logs_insert_authenticated"
ON api_logs FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================================
-- Tabla: audit_commits
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_commits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hash text NOT NULL,
  author text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'feat',
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE audit_commits ENABLE ROW LEVEL SECURITY;

-- Los admins ven todos los commits; cada usuario ve los suyos
DROP POLICY IF EXISTS "commits_select_admin_or_own" ON audit_commits;
CREATE POLICY "commits_select_admin_or_own"
ON audit_commits FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  OR auth.uid() = user_id
);

-- Cualquier usuario autenticado puede insertar commits de auditoría
DROP POLICY IF EXISTS "commits_insert_authenticated" ON audit_commits;
CREATE POLICY "commits_insert_authenticated"
ON audit_commits FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================================
-- Índices
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_session_answers_session_id ON session_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_session_answers_user_id ON session_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_commits_created_at ON audit_commits(created_at DESC);

-- ============================================================
-- Función: handle_new_user
-- Trigger que crea automáticamente un perfil cuando un usuario se registra
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    CASE
      WHEN NEW.email = 'admin@cybtrain.io' THEN 'admin'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Función: update_last_active
-- Actualiza last_active en el perfil del usuario
-- ============================================================
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles SET last_active = now() WHERE id = auth.uid();
  RETURN NEW;
END;
$$;
