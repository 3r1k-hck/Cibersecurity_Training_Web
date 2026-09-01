import { useMemo } from 'react';
import { Users, Award, Activity, GitCommit } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BarChart, DonutChart, LineChart } from '@/components/charts';
import { phishingEmails, quizQuestions } from '@/lib/data';

const maxTotal = phishingEmails.length + quizQuestions.length;

export default function AdminOverview() {
  const { records, commits, apiLogs } = useApp();

  const stats = useMemo(() => {
    const totalUsers = records.length;
    const totalSessions = records.reduce((s, r) => s + r.attempts, 0);
    const avgBest = totalUsers ? Math.round(records.reduce((s, r) => s + r.bestScore, 0) / totalUsers) : 0;
    return { totalUsers, totalSessions, avgBest };
  }, [records]);

  const scoreBars = useMemo(() => {
    return records
      .filter((r) => r.attempts > 0)
      .map((r) => ({ label: r.username, value: r.bestScore }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [records]);

  const roleDonut = useMemo(() => {
    const admins = records.filter((r) => r.role === 'admin').length;
    const users = records.filter((r) => r.role === 'user').length;
    return [
      { label: 'Alumnos', value: users, color: '#22c55e' },
      { label: 'Profesores', value: admins, color: '#0891b2' },
    ];
  }, [records]);

  const activityLine = useMemo(() => {
    const days = 7;
    const buckets: { label: string; value: number }[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = d.getTime() + 86400000;
      const count = apiLogs.filter((l) => l.timestamp >= d.getTime() && l.timestamp < next).length;
      buckets.push({ label: d.toLocaleDateString('es-ES', { weekday: 'short' }).slice(0, 2), value: count });
    }
    return buckets;
  }, [apiLogs]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card icon={<Users className="w-5 h-5" />} label="Alumnos Totales" value={stats.totalUsers} color="emerald" />
        <Card icon={<Activity className="w-5 h-5" />} label="Sesiones Totales" value={stats.totalSessions} color="cyan" />
        <Card icon={<Award className="w-5 h-5" />} label="Mejor Puntuacion Media" value={`${stats.avgBest}/${maxTotal}`} color="blue" />
        <Card icon={<GitCommit className="w-5 h-5" />} label="Commits de Auditoria" value={commits.length} color="violet" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Mejores Puntuaciones</h3>
          <p className="text-xs text-slate-500 mb-3">Mejor puntuacion por alumno (max {maxTotal})</p>
          <BarChart data={scoreBars.length ? scoreBars : [{ label: '—', value: 0 }]} height={200} />
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Roles de Alumnos</h3>
          <p className="text-xs text-slate-500 mb-4">Distribucion de cuentas</p>
          <DonutChart segments={roleDonut} size={150} />
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Actividad API (7 dias)</h3>
        <p className="text-xs text-slate-500 mb-3">Eventos webhook enviados por dia</p>
        <LineChart data={activityLine} color="#0891b2" height={160} />
      </div>
    </div>
  );
}

function Card({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
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
    </div>
  );
}
