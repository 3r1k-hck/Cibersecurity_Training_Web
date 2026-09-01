import { useMemo, useState } from 'react';
import { Database, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { phishingEmails, quizQuestions } from '@/lib/data';
import type { UserRecord } from '@/types';

const maxTotal = phishingEmails.length + quizQuestions.length;

export default function DatabaseTable() {
  const { records } = useApp();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'username' | 'attempts' | 'bestScore' | 'lastActive'>('lastActive');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expanded, setExpanded] = useState<string | null>(null);

  const rows = useMemo(() => {
    let r = records.filter((x) =>
      x.username.toLowerCase().includes(query.toLowerCase()) ||
      x.email.toLowerCase().includes(query.toLowerCase()),
    );
    r = r.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'username') return a.username.localeCompare(b.username) * dir;
      if (sortKey === 'lastActive') return a.lastActive.localeCompare(b.lastActive) * dir;
      return (a[sortKey] - b[sortKey]) * dir;
    });
    return r;
  }, [records, query, sortKey, sortDir]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  }

  function SortHeader({ label, k }: { label: string; k: typeof sortKey }) {
    return (
      <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors">
        {label}
        {sortKey === k && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
      </button>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">Base de Datos de Alumnos</span>
          <span className="text-xs font-mono text-slate-500">[{records.length} filas]</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-1.5 w-48 sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar alumnos..."
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-800 bg-slate-950/30">
              <th className="text-left font-medium px-5 py-2.5"><SortHeader label="Usuario" k="username" /></th>
              <th className="text-left font-medium px-3 py-2.5 hidden sm:table-cell">Rol</th>
              <th className="text-right font-medium px-3 py-2.5"><SortHeader label="Intentos" k="attempts" /></th>
              <th className="text-right font-medium px-3 py-2.5"><SortHeader label="Mejor" k="bestScore" /></th>
              <th className="text-left font-medium px-3 py-2.5 hidden md:table-cell"><SortHeader label="Ultima Actividad" k="lastActive" /></th>
              <th className="text-right font-medium px-5 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} className="text-center text-slate-600 py-8 text-sm">No se encontraron alumnos.</td></tr>
            )}
            {rows.map((r) => (
              <Row
                key={r.id}
                record={r}
                expanded={expanded === r.id}
                onToggle={() => setExpanded((e) => (e === r.id ? null : r.id))}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ record, expanded, onToggle }: { record: UserRecord; expanded: boolean; onToggle: () => void }) {
  const pct = Math.round((record.bestScore / maxTotal) * 100);
  return (
    <>
      <tr className="border-b border-slate-800/60 hover:bg-slate-800/20 transition-colors">
        <td className="px-5 py-3">
          <p className="text-sm text-white font-medium">{record.username}</p>
          <p className="text-xs text-slate-500 font-mono">{record.email}</p>
        </td>
        <td className="px-3 py-3 hidden sm:table-cell">
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${record.role === 'admin' ? 'bg-violet-500/15 text-violet-400' : 'bg-slate-700/50 text-slate-400'}`}>
            {record.role}
          </span>
        </td>
        <td className="px-3 py-3 text-right font-mono text-slate-300">{record.attempts}</td>
        <td className="px-3 py-3 text-right">
          <div className="inline-flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden lg:block">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-sm text-emerald-400">{record.bestScore}/{maxTotal}</span>
          </div>
        </td>
        <td className="px-3 py-3 hidden md:table-cell text-xs text-slate-500 font-mono">
          {new Date(record.lastActive).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
        </td>
        <td className="px-5 py-3 text-right">
          <button onClick={onToggle} className="text-xs text-slate-400 hover:text-emerald-400 transition-colors">
            {expanded ? 'Ocultar' : 'Ver'}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-slate-950/40">
          <td colSpan={6} className="px-5 py-4 animate-fade-up">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Historial de Sesiones ({record.sessions.length})</p>
            {record.sessions.length === 0 ? (
              <p className="text-sm text-slate-600">No hay sesiones completadas aun.</p>
            ) : (
              <div className="space-y-2">
                {record.sessions.slice().reverse().map((s, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-3 text-xs bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
                    <span className="font-mono text-slate-500">{new Date(s.completedAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    <span className="text-emerald-400 font-mono">Phishing: {s.phishingScore}/{phishingEmails.length}</span>
                    <span className="text-cyan-400 font-mono">Quiz: {s.quizScore}/{quizQuestions.length}</span>
                    <span className="text-white font-mono ml-auto">Total: {s.totalScore}/{maxTotal}</span>
                  </div>
                ))}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
