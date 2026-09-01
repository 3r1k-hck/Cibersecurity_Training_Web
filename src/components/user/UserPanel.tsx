import { useMemo, useState } from 'react';
import { Mail, Brain, LayoutDashboard, LogOut, Shield, User as UserIcon, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PhishingGame from '@/components/user/PhishingGame';
import Quiz from '@/components/user/Quiz';
import QuestionBank from '@/components/user/QuestionBank';
import UserDashboard from '@/components/user/UserDashboard';
import type { PhishingAnswerRecord, QuizAnswerRecord, SessionResult } from '@/types';

type Tab = 'phishing' | 'quiz' | 'bank' | 'dashboard';

export default function UserPanel() {
  const { currentUser, logout, saveSessionResult, records } = useApp();
  const [tab, setTab] = useState<Tab>('phishing');
  const myRecord = records.find((r) => r.id === currentUser?.id);
  const phishingBest = useMemo(
    () => myRecord?.sessions.reduce((m, s) => Math.max(m, s.phishingScore), 0) ?? 0,
    [myRecord],
  );
  const [phishingResult, setPhishingResult] = useState<{ score: number; answers: PhishingAnswerRecord[] } | null>(null);
  const [quizResult, setQuizResult] = useState<{ score: number; answers: QuizAnswerRecord[] } | null>(null);
  const [toast, setToast] = useState('');

  function handlePhishingComplete(r: { phishingScore: number; phishingAnswers: PhishingAnswerRecord[] }) {
    setPhishingResult({ score: r.phishingScore, answers: r.phishingAnswers });
    setToast('Modulo de phishing guardado. Continua al quiz para registrar tu sesion completa.');
    setTimeout(() => setToast(''), 4000);
  }

  function handleQuizComplete(score: number, answers: QuizAnswerRecord[]) {
    setQuizResult({ score, answers });
    if (phishingResult) {
      const result: SessionResult = {
        phishingScore: phishingResult.score,
        quizScore: score,
        totalScore: phishingResult.score + score,
        phishingAnswers: phishingResult.answers,
        quizAnswers: answers,
        completedAt: Date.now(),
      };
      saveSessionResult(result);
      setToast('Sesion registrada. Revisa tu panel de progreso para ver tu puntuacion actualizada.');
      setTimeout(() => setToast(''), 5000);
      setTab('dashboard');
    } else {
      setToast('Completa primero el modulo de phishing para registrar una sesion completa.');
      setTimeout(() => setToast(''), 4000);
      setTab('phishing');
    }
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'phishing', label: 'Juego de Phishing', icon: <Mail className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz de Seguridad', icon: <Brain className="w-4 h-4" /> },
    { id: 'bank', label: 'Banco de Preguntas', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Mi Progreso', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen grid-bg">
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">CyberTrain</p>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">Portal de Formacion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <UserIcon className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{currentUser?.username}</span>
            </div>
            <button onClick={logout} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/30">
              <LogOut className="w-3.5 h-3.5" /> Cerrar Sesion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-1 p-1 bg-slate-900/60 border border-slate-800 rounded-xl mb-6 overflow-x-auto scrollbar-thin">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                tab === t.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.icon} <span>{t.label}</span>
            </button>
          ))}
        </div>

        {toast && (
          <div className="mb-4 flex items-center gap-2 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2.5 animate-fade-up">
            <Shield className="w-4 h-4 shrink-0" /> {toast}
          </div>
        )}

        <div key={tab} className="animate-fade-up">
          {tab === 'phishing' && <PhishingGame onComplete={handlePhishingComplete} bestScore={phishingBest} />}
          {tab === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
          {tab === 'bank' && <QuestionBank />}
          {tab === 'dashboard' && <UserDashboard />}
        </div>
      </div>
    </div>
  );
}
