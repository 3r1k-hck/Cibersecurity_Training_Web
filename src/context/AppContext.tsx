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

async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Profile query error:', error.message);
  }

  return data as ProfileRow | null;
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

  useEffect(() => {
    let mounted = true;

    const safetyTimer = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 5000);

    supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        try {
          if (event === 'SIGNED_OUT' || !session?.user) {
            if (mounted) {
              setCurrentUser(null);
              setRecords([]);
              setApiLogs([]);
              setCommits([]);
              setLoading(false);
            }
            return;
          }

          // For all events with a session, load profile if we don't have a user yet.
          // If login() already set the user, don't override it.
          if (mounted) {
            // Check current state to avoid overriding login()
            const currentUserState = currentUserRef.current;
            if (currentUserState && currentUserState.id === session.user.id) {
              setLoading(false);
              return;
            }

            const profile = await fetchProfile(session.user.id);

            if (!profile) {
              // Profile doesn't exist — create it as fallback
              const username = (session.user.user_metadata as Record<string, string>)?.username
                ?? session.user.email?.split('@')[0]
                ?? 'usuario';
              const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: session.user.id,
                  username,
                  role: session.user.email === 'admin@cybtrain.io' ? 'admin' : 'user',
                })
                .select()
                .maybeSingle();

              if (insertError) {
                console.error('Fallback profile insert error:', insertError.message);
              }

              if (newProfile && mounted) {
                const user = toUser(newProfile as ProfileRow, session.user.email ?? '');
                currentUserRef.current = user;
                setCurrentUser(user);
                await loadData(user);
              }
            } else if (mounted) {
              const user = toUser(profile, session.user.email ?? '');
              currentUserRef.current = user;
              setCurrentUser(user);
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

    if (!data.user) {
      return { ok: false, error: 'No se pudo crear la cuenta.' };
    }

    // onAuthStateChange will fire SIGNED_IN and handle profile + dashboard loading

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

    // Get the session explicitly to make sure the token is ready
    await supabase.auth.getSession();

    if (!data.user) {
      return { ok: false, error: 'No se recibio informacion del usuario.' };
    }

    // Try to load the profile directly
    const profile = await fetchProfile(data.user.id);

    if (profile) {
      const user = toUser(profile, email);
      currentUserRef.current = user;
      setCurrentUser(user);
      setLoading(false);
      loadData(user);

      supabase
        .from('profiles')
        .update({ last_active: new Date().toISOString() })
        .eq('id', user.id)
        .then();

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
    currentUserRef.current = null;
    setCurrentUser(null);
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
