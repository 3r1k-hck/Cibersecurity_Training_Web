import type { LucideIcon } from 'lucide-react';
import { Crown, Crosshair, Award, Zap, Brain } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  accent: string;
  glow: string;
}

export function evaluateAchievements(score: number, total: number, durationSeconds: number): Achievement[] {
  const accuracy = total > 0 ? score / total : 0;
  const avgSeconds = total > 0 ? durationSeconds / total : 0;
  const passed = accuracy >= 0.7;

  return [
    {
      id: 'perfect',
      name: 'Mente Maestra',
      description: 'Responde todas las preguntas correctamente (100%)',
      icon: Crown,
      unlocked: accuracy === 1,
      accent: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
      glow: 'shadow-[0_0_24px_-6px_rgba(251,191,36,0.5)]',
    },
    {
      id: 'sniper',
      name: 'Francotirador',
      description: 'Alcanza una precisión de al menos 90%',
      icon: Crosshair,
      unlocked: accuracy >= 0.9,
      accent: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
      glow: 'shadow-[0_0_24px_-6px_rgba(251,113,133,0.5)]',
    },
    {
      id: 'certified',
      name: 'Aprobado Oficial',
      description: 'Supera el 70% necesario para aprobar',
      icon: Award,
      unlocked: passed,
      accent: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      glow: 'shadow-[0_0_24px_-6px_rgba(52,211,153,0.5)]',
    },
    {
      id: 'speedster',
      name: 'Relámpago',
      description: 'Aprueba con menos de 8 segundos por pregunta',
      icon: Zap,
      unlocked: passed && avgSeconds < 8,
      accent: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
      glow: 'shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]',
    },
    {
      id: 'analyst',
      name: 'Analista Minucioso',
      description: 'Aprueba dedicando 20 segundos o más por pregunta',
      icon: Brain,
      unlocked: passed && avgSeconds >= 20,
      accent: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
      glow: 'shadow-[0_0_24px_-6px_rgba(96,165,250,0.5)]',
    },
  ];
}
