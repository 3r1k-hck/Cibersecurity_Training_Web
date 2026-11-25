import { Lock, Medal } from 'lucide-react';
import { evaluateAchievements } from '@/lib/badges';

interface Props {
  score: number;
  total: number;
  durationSeconds: number;
}

export default function AchievementBadges({ score, total, durationSeconds }: Props) {
  const achievements = evaluateAchievements(score, total, durationSeconds);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="mt-6 text-left">
      <div className="flex items-center gap-2 mb-3">
        <Medal className="w-4 h-4 text-amber-400" />
        <h4 className="text-sm font-semibold text-white">Logros de la sesión</h4>
        <span className="ml-auto text-xs font-mono text-slate-500">{unlockedCount} / {achievements.length}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {achievements.map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={a.id}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-500 animate-fade-up ${
                a.unlocked ? `${a.accent} ${a.glow}` : 'border-slate-800 bg-slate-950/40'
              }`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span
                className={`inline-flex shrink-0 items-center justify-center w-9 h-9 rounded-full ${
                  a.unlocked ? 'bg-current/10' : 'bg-slate-800/60'
                }`}
              >
                {a.unlocked ? (
                  <Icon className="w-[18px] h-[18px]" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-600" />
                )}
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-semibold truncate ${a.unlocked ? '' : 'text-slate-500'}`}>
                  {a.name}
                </span>
                <span className="block text-[11px] leading-snug text-slate-500">{a.description}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
