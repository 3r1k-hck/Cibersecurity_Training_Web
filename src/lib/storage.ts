import type { UserRecord, GitCommit, ApiLogEntry, User } from '@/types';

const KEYS = {
  users: 'cybtrain_users',
  records: 'cybtrain_records',
  apiLogs: 'cybtrain_api_logs',
  commits: 'cybtrain_commits',
  session: 'cybtrain_session',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable */
  }
}

export const storage = {
  keys: KEYS,
  getUsers: () => read<User[]>(KEYS.users, []),
  setUsers: (v: User[]) => write(KEYS.users, v),
  getRecords: () => read<UserRecord[]>(KEYS.records, []),
  setRecords: (v: UserRecord[]) => write(KEYS.records, v),
  getApiLogs: () => read<ApiLogEntry[]>(KEYS.apiLogs, []),
  setApiLogs: (v: ApiLogEntry[]) => write(KEYS.apiLogs, v),
  getCommits: () => read<GitCommit[]>(KEYS.commits, []),
  setCommits: (v: GitCommit[]) => write(KEYS.commits, v),
  getSession: () => read<User | null>(KEYS.session, null),
  setSession: (v: User | null) => write(KEYS.session, v),
};

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
