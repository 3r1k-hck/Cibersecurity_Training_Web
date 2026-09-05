import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type {
  User,
  UserRecord,
  SessionResult,
  ApiLogEntry,
  GitCommit,
  ProfileRow,
  SessionRow,
  ApiLogRow,
  AuditCommitRow,
} from '@/types';
import { supabase } from '@/lib/supabase';
import { gitHash } from '@/lib/git';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface AppContextValue {
  currentUser: User | null;
  records: UserRecord[];
  apiLogs: ApiLogEntry[];
  commits: GitCommit[];
  loading: boolean;
  register: (input: RegisterInput) => Promise<{ ok: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  saveSessionResult: (result: SessionResult) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

function toUser(p: ProfileRow, email: string): User {
  return {
    id: p.id,
    username: p.username,
    email,
    role: p.role,
    createdAt: p.created_at,
    lastActive: p.last_active,
  };
}

function toApiLog(r: ApiLogRow): ApiLogEntry {
  return {
    id: r.id,
    timestamp: new Date(r.created_at).getTime(),
    method: r.method,
    endpoint: r.endpoint,
    status: r.status,
    headers: r.headers as Record<string, string>,
    body: r.body as Record<string, unknown>,
    response: r.response as Record<string, unknown>,
    user: r.username,
  };
}

function toCommit(r: AuditCommitRow): GitCommit {
  return {
    hash: r.hash,
    author: r.author,
    date: new Date(r.created_at).getTime(),
    message: r.message,
    type: r.type,
  };
}

async function insertApiLog(
  userId: string,
  username: string,
  method: string,
  endpoint: string,
  body: Record<string, unknown>,
  headers: Record<string, string>,
) {
  try {
    await supabase.from('api_logs').insert({
      user_id: userId,
      method,
      endpoint,
      status: 200,
      headers,
      body,
      response: { ok: true, received: true },
      username,
    });
  } catch (err) {
    console.error('Failed to insert API log:', err);
  }
}

async function insertCommit(
  userId: string,
  author: string,
  message: string,
  type: GitCommit['type'] = 'feat',
) {
  try {
    await supabase.from('audit_commits').insert({
      hash: gitHash(),
      author,
      message,
      type,
      user_id: userId,
    });
  } catch (err) {
    console.error('Failed to insert audit commit:', err);
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [apiLogs, setApiLogs] = useState<ApiLogEntry[]>([]);
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserRef = useRef<User | null>(null);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  // Auth state listener + initial load
  useEffect(() => {
    let mounted = true;

    // Safety timeout: if onAuthStateChange doesn't fire within 5s, stop loading
    const safetyTimer = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 5000);

    supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        try {
          // Only handle initial session load and sign-out.
          // Login flow handles profile loading directly in login().
          if (event === 'INITIAL_SESSION' || event === 'SIGNED_OUT') {
            if (!session?.user) {
              if (mounted) {
                setCurrentUser(null);
                currentUserRef.current = null;
                setLoading(false);
              }
              return;
            }
            if (mounted && !currentUserRef.current) {
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();

              if (profileError) {
                console.error('Error loading profile:', profileError.message);
              }

              if (!profile || !mounted) {
                if (mounted) {
                  setCurrentUser(null);
                  currentUserRef.current = null;
                  setLoading(false);
                }
                return;
              }

              const user = toUser(profile as ProfileRow, session.user.email ?? '');
              setCurrentUser(user);
              currentUserRef.current = user;
              await loadData(user);
            }
          }
        } catch (err) {
          console.error('Auth state change error:', err);
        } finally {
          if (mounted) setLoading(false);
        }
      })();
    });

    return () => { mounted = false; clearTimeout(safetyTimer); };
  }, []);

  async function loadData(user: User) {
    await Promise.allSettled([
      loadRecords(user),
      loadApiLogs(user),
      loadCommits(user),
    ]);
  }

  async function loadRecords(user: User) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*');

    const { data: sessions } = await supabase
      .from('sessions')
      .select('*')
      .order('completed_at', { ascending: true });

    if (!profiles) return;

    const profileRows = profiles as ProfileRow[];
    const sessionRows = (sessions ?? []) as SessionRow[];

    const recs: UserRecord[] = profileRows.map((p) => {
      const userSessions = sessionRows.filter((s) => s.user_id === p.id);
      const bestScore = userSessions.reduce((m, s) => Math.max(m, s.total_score), 0);
      return {
        id: p.id,
        username: p.username,
        email: '',
        role: p.role,
        createdAt: p.created_at,
        lastActive: p.last_active,
        sessions: userSessions.map((s) => ({
          phishingScore: s.phishing_score,
          quizScore: s.quiz_score,
          totalScore: s.total_score,
          phishingAnswers: [],
          quizAnswers: [],
          completedAt: new Date(s.completed_at).getTime(),
        })),
        bestScore,
        attempts: userSessions.length,
      };
    });

    // Fill in emails from auth — not available via profile table, so we leave blank
    // unless it's the current user
    const enriched = recs.map((r) =>
      r.id === user.id ? { ...r, email: user.email } : r,
    );

    setRecords(enriched);
  }

  async function loadApiLogs(user: User) {
    const { data } = await supabase
      .from('api_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(120);

    if (!data) return;
    setApiLogs((data as ApiLogRow[]).map(toApiLog));
    void user;
  }

  async function loadCommits(user: User) {
    const { data } = await supabase
      .from('audit_commits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!data) return;
    setCommits((data as AuditCommitRow[]).map(toCommit));
    void user;
  }

  async function register(input: RegisterInput): Promise<{ ok: boolean; error?: string }> {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: { username: input.username },
      },
    });

    if (error) {
      return { ok: false, error: translateAuthError(error.message) };
    }

    if (data.user) {
      // Wait a moment for the trigger to create the profile
      await new Promise((r) => setTimeout(r, 500));

      Promise.allSettled([
        insertApiLog(
          data.user.id,
          input.username,
          'POST',
          '/api/v1/auth/register',
          { username: input.username, email: input.email, role: 'user' },
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <session-token>',
          },
        ),
        insertCommit(
          data.user.id,
          'system@webhook.github.com',
          `feat: registrar nuevo usuario '${input.username}'`,
        ),
      ]);
    }

    return { ok: true };
  }

  async function login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { ok: false, error: translateAuthError(error.message) };
    }

    if (data.user) {
      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileError || !profile) {
          return { ok: false, error: 'No se pudo cargar el perfil de usuario.' };
        }

        const user = toUser(profile as ProfileRow, email);
        setCurrentUser(user);
        currentUserRef.current = user;

        supabase
          .from('profiles')
          .update({ last_active: new Date().toISOString() })
          .eq('id', user.id)
          .then(() => loadData(user));
      } catch {
        // onAuthStateChange will handle it as fallback
      }

      Promise.allSettled([
        insertApiLog(
          data.user.id,
          email,
          'POST',
          '/api/v1/auth/login',
          { email, status: 'authenticated' },
          {
            'Content-Type': 'application/json',
            Authorization: 'Basic <base64-credentials>',
          },
        ),
        insertCommit(
          data.user.id,
          `${email}@cybtrain.io`,
          `feat: usuario '${email.split('@')[0]}' inicio sesion en la plataforma`,
        ),
      ]);
    }

    return { ok: true };
  }

  async function logout(): Promise<void> {
    if (currentUser) {
      await insertCommit(
        currentUser.id,
        `${currentUser.username}@cybtrain.io`,
        `chore: usuario '${currentUser.username}' cerro sesion`,
        'chore',
      );
    }
    await supabase.auth.signOut();
    setCurrentUser(null);
    currentUserRef.current = null;
    setRecords([]);
    setApiLogs([]);
    setCommits([]);
  }

  async function saveSessionResult(result: SessionResult): Promise<void> {
    if (!currentUser) return;

    const { data: sessionRow, error: sessionError } = await supabase
      .from('sessions')
      .insert({
        user_id: currentUser.id,
        phishing_score: result.phishingScore,
        quiz_score: result.quizScore,
        total_score: result.totalScore,
      })
      .select()
      .single();

    if (sessionError || !sessionRow) return;

    const sessionId = (sessionRow as SessionRow).id;

    const answerRows = [
      ...result.phishingAnswers.map((a) => ({
        session_id: sessionId,
        user_id: currentUser.id,
        item_id: a.emailId,
        item_type: 'phishing',
        selected: a.selected === 'phishing' ? 1 : 0,
        correct: a.correct,
      })),
      ...result.quizAnswers.map((a) => ({
        session_id: sessionId,
        user_id: currentUser.id,
        item_id: String(a.questionId),
        item_type: 'quiz',
        selected: a.selected,
        correct: a.correct,
      })),
    ];

    if (answerRows.length > 0) {
      await supabase.from('session_answers').insert(answerRows);
    }

    await insertApiLog(
      currentUser.id,
      currentUser.username,
      'POST',
      '/api/v1/sessions/submit',
      {
        user_id: currentUser.id,
        phishing_score: result.phishingScore,
        quiz_score: result.quizScore,
        total_score: result.totalScore,
        webhook: 'dispatched',
      },
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer <jwt-${currentUser.id}>`,
        'X-Webhook-Target': 'github.com/cybtrain/audit',
      },
    );

    await insertCommit(
      currentUser.id,
      `${currentUser.username}@cybtrain.io`,
      `feat: actualizar puntuacion_usuario hash: #${gitHash()} (total=${result.totalScore})`,
    );

    await loadData(currentUser);
  }

  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      records,
      apiLogs,
      commits,
      loading,
      register,
      login,
      logout,
      saveSessionResult,
    }),
    [currentUser, records, apiLogs, commits, loading],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function translateAuthError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('already registered') || lower.includes('already been registered')) {
    return 'Ya existe una cuenta con este correo electronico.';
  }
  if (lower.includes('invalid login') || lower.includes('invalid credentials')) {
    return 'Correo o contrasena incorrectos.';
  }
  if (lower.includes('email not confirmed')) {
    return 'El correo no ha sido confirmado.';
  }
  if (lower.includes('password')) {
    return 'La contrasena debe tener al menos 6 caracteres.';
  }
  return msg;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
