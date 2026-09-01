export type Role = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  lastActive: string;
}

export interface QuizAnswerRecord {
  questionId: number;
  selected: number;
  correct: boolean;
}

export interface PhishingAnswerRecord {
  emailId: string;
  selected: 'phishing' | 'real';
  correct: boolean;
  detectedIndicators: string[];
}

export interface SessionResult {
  phishingScore: number;
  quizScore: number;
  totalScore: number;
  phishingAnswers: PhishingAnswerRecord[];
  quizAnswers: QuizAnswerRecord[];
  completedAt: number;
}

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  lastActive: string;
  sessions: SessionResult[];
  bestScore: number;
  attempts: number;
}

export interface ApiLogEntry {
  id: string;
  timestamp: number;
  method: string;
  endpoint: string;
  status: number;
  headers: Record<string, string>;
  body: Record<string, unknown>;
  response: Record<string, unknown>;
  user: string;
}

export interface GitCommit {
  hash: string;
  author: string;
  date: number;
  message: string;
  type: 'feat' | 'fix' | 'docs' | 'chore' | 'audit';
}

export interface SessionRow {
  id: string;
  user_id: string;
  phishing_score: number;
  quiz_score: number;
  total_score: number;
  completed_at: string;
}

export interface ProfileRow {
  id: string;
  username: string;
  role: Role;
  created_at: string;
  last_active: string;
}

export interface ApiLogRow {
  id: string;
  user_id: string | null;
  method: string;
  endpoint: string;
  status: number;
  headers: Record<string, unknown>;
  body: Record<string, unknown>;
  response: Record<string, unknown>;
  username: string;
  created_at: string;
}

export interface AuditCommitRow {
  id: string;
  hash: string;
  author: string;
  message: string;
  type: GitCommit['type'];
  user_id: string | null;
  created_at: string;
}
