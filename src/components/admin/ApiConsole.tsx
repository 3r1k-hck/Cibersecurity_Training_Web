import { useState } from 'react';
import { Webhook, ChevronRight, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ApiConsole() {
  const { apiLogs } = useApp();
  const [selected, setSelected] = useState<string | null>(apiLogs[0]?.id ?? null);

  const active = apiLogs.find((l) => l.id === selected) ?? apiLogs[0];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Webhook className="w-4 h-4 text-cyan-400" />
          <span className="font-medium">Consola API / Webhook</span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 ml-1">
            <Activity className="w-3 h-3" /> en vivo
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500">{apiLogs.length} eventos</span>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] divide-y md:divide-y-0 md:divide-x divide-slate-800 max-h-[420px]">
        <div className="overflow-y-auto scrollbar-thin md:max-h-none max-h-48">
          {apiLogs.length === 0 ? (
            <p className="text-sm text-slate-600 p-4 text-center">No hay eventos API aun.</p>
          ) : (
            apiLogs.map((l) => {
              const isActive = l.id === (active?.id ?? selected);
              return (
                <button
                  key={l.id}
                  onClick={() => setSelected(l.id)}
                  className={`w-full text-left px-3 py-2.5 border-b border-slate-800/60 transition-colors flex items-start gap-2 ${
                    isActive ? 'bg-cyan-500/10' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <ChevronRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{l.method}</span>
                      <span className="text-xs text-slate-400 truncate font-mono">{l.endpoint}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">
                      {new Date(l.timestamp).toLocaleTimeString('es-ES', { hour12: false })} · {l.user}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 mt-0.5">{l.status}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="overflow-y-auto scrollbar-thin p-4">
          {active ? (
            <div className="space-y-4 animate-fade-up" key={active.id}>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-500 mb-1.5 font-semibold">Peticion</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{active.method}</span>
                  <code className="text-xs text-cyan-300 font-mono">{active.endpoint}</code>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-500 mb-1.5 font-semibold">Cabeceras de Seguridad</p>
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 font-mono text-xs space-y-1">
                  {Object.entries(active.headers).map(([k, v]) => (
                    <div key={k} className="flex flex-wrap gap-x-2">
                      <span className="text-slate-500">{k}:</span>
                      <span className="text-amber-300 break-all">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-500 mb-1.5 font-semibold">Cuerpo de Peticion (JSON)</p>
                <pre className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto scrollbar-thin whitespace-pre-wrap break-all">
{JSON.stringify(active.body, null, 2)}
                </pre>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-500 mb-1.5 font-semibold">Respuesta</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-emerald-400">{active.status} OK</span>
                </div>
                <pre className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 font-mono text-xs text-emerald-300 overflow-x-auto scrollbar-thin whitespace-pre-wrap">
{JSON.stringify(active.response, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-600 text-center py-8">Selecciona un evento para inspeccionar la peticion.</p>
          )}
        </div>
      </div>
    </div>
  );
}
