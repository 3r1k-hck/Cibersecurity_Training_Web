-- Create a SECURITY DEFINER function to check admin role without recursive policy evaluation
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  );
$$;

-- Drop all existing policies on profiles
DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_admin" ON public.profiles;

-- Recreate policies using is_admin() to avoid recursion
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles FOR SELECT
  TO authenticated USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_insert_admin" ON public.profiles FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Also fix the same recursive pattern on other tables
DROP POLICY IF EXISTS "api_logs_select_admin_or_own" ON public.api_logs;
CREATE POLICY "api_logs_select_admin_or_own" ON public.api_logs FOR SELECT
  TO authenticated USING (public.is_admin() OR auth.uid() = user_id);

DROP POLICY IF EXISTS "commits_select_admin_or_own" ON public.audit_commits;
CREATE POLICY "commits_select_admin_or_own" ON public.audit_commits FOR SELECT
  TO authenticated USING (public.is_admin() OR auth.uid() = user_id);

DROP POLICY IF EXISTS "sessions_select_own_or_admin" ON public.sessions;
CREATE POLICY "sessions_select_own_or_admin" ON public.sessions FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "answers_select_own_or_admin" ON public.session_answers;
CREATE POLICY "answers_select_own_or_admin" ON public.session_answers FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR public.is_admin());

-- Grant execute on is_admin to authenticated
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
