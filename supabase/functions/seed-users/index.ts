import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const USERS = [
  {
    email: "admin@cybtrain.io",
    password: "admin123456",
    username: "admin",
    role: "admin",
  },
  {
    email: "maria.lopez@cybtrain.io",
    password: "alumno123",
    username: "maria.lopez",
    role: "user",
  },
  {
    email: "carlos.ruiz@cybtrain.io",
    password: "alumno123",
    username: "carlos.ruiz",
    role: "user",
  },
  {
    email: "laura.garcia@cybtrain.io",
    password: "alumno123",
    username: "laura.garcia",
    role: "user",
  },
  {
    email: "javier.martinez@cybtrain.io",
    password: "alumno123",
    username: "javier.martinez",
    role: "user",
  },
  {
    email: "ana.fernandez@cybtrain.io",
    password: "alumno123",
    username: "ana.fernandez",
    role: "user",
  },
  {
    email: "diego.sanchez@cybtrain.io",
    password: "alumno123",
    username: "diego.sanchez",
    role: "user",
  },
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const results: Array<{ email: string; status: string; error?: string }> = [];

  for (const user of USERS) {
    try {
      // Check if user already exists
      const { data: existing } = await adminClient
        .from("profiles")
        .select("id, email")
        .eq("username", user.username)
        .maybeSingle();

      if (existing) {
        // Update password via admin API
        const { error: updateError } = await adminClient.auth.admin.updateUserById(
          existing.id,
          { password: user.password, email_confirm: true },
        );

        if (updateError) {
          results.push({ email: user.email, status: "update_failed", error: updateError.message });
        } else {
          results.push({ email: user.email, status: "updated" });
        }
        continue;
      }

      // Create new user via admin API
      const { data, error } = await adminClient.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: { username: user.username },
      });

      if (error) {
        results.push({ email: user.email, status: "create_failed", error: error.message });
        continue;
      }

      // Update profile with correct role
      if (data.user) {
        const { error: profileError } = await adminClient
          .from("profiles")
          .update({ role: user.role })
          .eq("id", data.user.id);

        if (profileError) {
          results.push({ email: user.email, status: "profile_update_failed", error: profileError.message });
        } else {
          results.push({ email: user.email, status: "created" });
        }
      }
    } catch (err) {
      results.push({ email: user.email, status: "error", error: String(err) });
    }
  }

  return new Response(
    JSON.stringify({ results }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
