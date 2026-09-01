import { useState } from 'react';
import { Shield, LogOut, LayoutDashboard, Database, Webhook, Terminal, User as UserIcon, Users, Network } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import AdminOverview from '@/components/admin/AdminOverview';
import DatabaseTable from '@/components/admin/DatabaseTable';
import ApiConsole from '@/components/admin/ApiConsole';
import GitLogTerminal from '@/components/admin/GitLogTerminal';
import ArchitectureDiagram from '@/components/admin/ArchitectureDiagram';

type Tab = 'overview' | 'architecture' | 'database' | 'api' | 'git';

export default function AdminPanel() {
  const { currentUser, logout, apiLogs, commits } = useApp();
  const [tab, setTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Resumen', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'architecture', label: 'Arquitectura', icon: <Network className="w-4 h-4" /> },
    { id: 'database', label: 'Base de Datos', icon: <Database className="w-4 h-4" /> },
    { id: 'api', label: 'Consola API', icon: <Webhook className="w-4 h-4" />, badge: apiLogs.length },
    { id: 'git', label: 'Auditoria Git', icon: <Terminal className="w-4 h-4" />, badge: commits.length },
  ];

  return (
    <div className="min-h-screen grid-bg">
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">CyberTrain</p>
              <p className="text-[10px] text-emerald-400 leading-none mt-0.5 font-mono">PANEL DE ALUMNOS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <UserIcon className="w-4 h-4 text-violet-400" />
              <span className="hidden sm:inline">{currentUser?.username}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400">ADMIN</span>
            </div>
            <button onClick={logout} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/30">
              <LogOut className="w-3.5 h-3.5" /> Cerrar Sesion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-500 font-mono">
          <Users className="w-3.5 h-3.5" />
          <span>Sistema full-stack: 5 capas conectadas · PostgreSQL + Auth + RLS + API/Webhook + Auditoria Git · Ver pestana Arquitectura</span>
        </div>

        <div className="flex gap-1 p-1 bg-slate-900/60 border border-slate-800 rounded-xl mb-6 overflow-x-auto scrollbar-thin">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-[110px] inline-flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all relative ${
                tab === t.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.badge !== undefined && t.badge > 0 && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div key={tab} className="animate-fade-up">
          {tab === 'overview' && <AdminOverview />}
          {tab === 'architecture' && <ArchitectureDiagram />}
          {tab === 'database' && <DatabaseTable />}
          {tab === 'api' && <ApiConsole />}
          {tab === 'git' && <GitLogTerminal />}
        </div>
      </div>
    </div>
  );
}
