import { useMemo } from 'react';
import { ShieldCheck, Brain, TrendingUp, Award, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LineChart } from '@/components/charts';
import { phishingEmails, quizQuestions } from '@/lib/data';

export default function UserDashboard() {
  const { currentUser, records } = useApp();
  const myRecord = records.find((r) => r.id === currentUser?.id);

  const stats = useMemo(() => {
    if (!myRecord) return { best: 0, attempts: 0, avg: 0, last: null as null | { phishing: number; quiz: number; total: number; date: number } };
    const sessions = myRecord.sessions;
    const best = myRecord.bestScore;
    const attempts = myRecord.attempts;
    const avg = sessions.length ? Math.round(sessions.reduce((s, x) => s + x.totalScore, 0) / sessions.length) : 0;
    const lastSession = sessions.length ? sessions[sessions.length - 1] : null;
    return {
      best,
      attempts,
      avg,
      last: lastSession ? { phishing: lastSession.phishingScore, quiz: lastSession.quizScore, total: lastSession.totalScore, date: lastSession.completedAt } : null,
    };
  }, [myRecord]);

  const trend = useMemo(() => {
    if (!myRecord) return [];
    return myRecord.sessions.map((s, i) => ({ label: `S${i + 1}`, value: s.totalScore }));
  }, [myRecord]);

  const maxTotal = phishingEmails.length + quizQuestions.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Award className="w-5 h-5" />} label="Mejor Puntuacion" value={`${stats.best}`} sub={`de ${maxTotal}`} color="emerald" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Puntuacion Media" value={`${stats.avg}`} sub={`de ${maxTotal}`} color="cyan" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Intentos" value={`${stats.attempts}`} sub="completados" color="blue" />
        <StatCard icon={<ShieldCheck className="w-5 h-5" />} label="Ultimo Total" value={`${stats.last?.total ?? 0}`} sub={`de ${maxTotal}`} color="violet" />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Tendencia de Puntuacion por Sesion</h3>
        </div>
        <LineChart data={trend.length ? trend : [{ label: '—', value: 0 }]} color="#22c55e" height={170} />
        {trend.length === 0 && <p className="text-center text-xs text-slate-600 -mt-12 mb-3 pointer-events-none">Completa una sesion para ver tu progreso</p>}
      </div>

      {stats.last && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Desglose de la Ultima Sesion</h3>
          <div className="grid grid-cols-3 gap-3">
            <MiniStat icon={<ShieldCheck className="w-4 h-4" />} label="Phishing" value={`${stats.last.phishing}/${phishingEmails.length}`} color="emerald" />
            <MiniStat icon={<Brain className="w-4 h-4" />} label="Quiz" value={`${stats.last.quiz}/${quizQuestions.length}`} color="cyan" />
            <MiniStat icon={<Target className="w-4 h-4" />} label="Total" value={`${stats.last.total}/${maxTotal}`} color="blue" />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
    violet: 'text-violet-400 bg-violet-500/10',
  };
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${colors[color]}`}>{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xs text-slate-600 mt-0.5 font-mono">{sub}</p>
    </div>
  );
}

function MiniStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
  };
  return (
    <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-3 text-center">
      <span className={`inline-flex ${colors[color]} mb-1`}>{icon}</span>
      <p className={`text-lg font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
