import { useState } from 'react';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatGitLog } from '@/lib/git';

export default function GitLogTerminal() {
  const { commits } = useApp();
  const [copied, setCopied] = useState(false);
  const logText = formatGitLog(commits);

  function copy() {
    navigator.clipboard?.writeText(logText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const sorted = commits.slice().sort((a, b) => b.date - a.date);

  return (
    <div className="bg-[#0a0e16] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-2">git@cybtrain-audit:~/repo (main)</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={copy} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto scrollbar-thin font-mono text-xs leading-relaxed">
        <p className="text-emerald-500/70 mb-2">$ git log --oneline --all</p>
        {sorted.length === 0 ? (
          <p className="text-slate-600">No hay commits aun.</p>
        ) : (
          <div className="space-y-3">
            {sorted.map((c) => {
              const d = new Date(c.date);
              const ds = d.toISOString().slice(0, 10);
              const time = d.toLocaleTimeString('es-ES', { hour12: false });
              const hashColor =
                c.type === 'feat' ? 'text-emerald-400' :
                c.type === 'fix' ? 'text-amber-400' :
                c.type === 'audit' ? 'text-cyan-400' :
                'text-slate-400';
              return (
                <div key={c.hash} className="animate-slide-in">
                  <p>
                    <span className={hashColor}>commit {c.hash}</span>
                    <span className="text-slate-600">  {ds} {time}</span>
                  </p>
                  <p>Autor: <span className="text-cyan-400">{c.author}</span></p>
                  <p className="text-slate-300 pl-4 mt-0.5">{c.message}</p>
                </div>
              );
            })}
          </div>
        )}
        <p className="text-emerald-500/70 mt-3 cursor-blink">$</p>
      </div>

      <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-mono">{commits.length} commits · webhook → github.com/cybtrain/audit</span>
        <span className="inline-flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> sincronizacion activa
        </span>
      </div>
    </div>
  );
}
