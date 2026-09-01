import { useState } from 'react';
import { Shield, Mail, CheckCircle2, XCircle, ArrowRight, Eye, Lightbulb, RotateCcw, Trophy } from 'lucide-react';
import { phishingEmails } from '@/lib/data';
import type { PhishingAnswerRecord } from '@/types';
import type { SessionResult } from '@/types';

interface Props {
  onComplete: (result: Pick<SessionResult, 'phishingScore' | 'phishingAnswers'>) => void;
  bestScore: number;
}

export default function PhishingGame({ onComplete, bestScore }: Props) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<PhishingAnswerRecord[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [lastChoice, setLastChoice] = useState<'phishing' | 'real' | null>(null);
  const [finished, setFinished] = useState(false);

  const email = phishingEmails[idx];

  function choose(choice: 'phishing' | 'real') {
    if (revealed) return;
    const correct = choice === (email.isPhishing ? 'phishing' : 'real');
    const record: PhishingAnswerRecord = {
      emailId: email.id,
      selected: choice,
      correct,
      detectedIndicators: email.isPhishing ? email.indicators : [],
    };
    setAnswers((a) => [...a, record]);
    setLastChoice(choice);
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= phishingEmails.length) {
      const score = answers.reduce((s, a) => (a.correct ? s + 1 : s), 0);
      setFinished(true);
      onComplete({ phishingScore: score, phishingAnswers: answers });
    } else {
      setIdx((i) => i + 1);
      setRevealed(false);
      setLastChoice(null);
    }
  }

  function restart() {
    setIdx(0);
    setAnswers([]);
    setRevealed(false);
    setLastChoice(null);
    setFinished(false);
  }

  if (finished) {
    const score = answers.reduce((s, a) => (a.correct ? s + 1 : s), 0);
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 mb-4">
          <Trophy className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Modulo de Phishing Completado</h3>
        <p className="text-slate-400 mt-2">Identificaste correctamente <span className="text-emerald-400 font-bold">{score}</span> de {phishingEmails.length} correos.</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={restart} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" /> Reintentar modulo
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-4">Tu mejor puntuacion hasta ahora: {bestScore} / {phishingEmails.length}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>Simulador de Bandeja de Entrada</span>
        </div>
        <span className="text-xs font-mono text-slate-500">{idx + 1} / {phishingEmails.length}</span>
      </div>

      <div className="px-5 py-1.5 bg-slate-950/30">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500" style={{ width: `${((idx) / phishingEmails.length) * 100}%` }} />
        </div>
      </div>

      <div className="p-5">
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-4">
          <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
            <div className="min-w-0">
              <p className="text-xs text-slate-500 mb-0.5">De</p>
              <p className="text-sm text-slate-200 font-medium truncate">{email.fromName} <span className="text-slate-500 font-mono">&lt;{email.from}&gt;</span></p>
            </div>
            <span className="text-xs text-slate-500 font-mono shrink-0">{email.date}</span>
          </div>
          <p className="text-sm font-semibold text-white mb-3">{email.subject}</p>
          <pre className="text-xs text-slate-400 font-mono whitespace-pre-wrap leading-relaxed font-mono">{email.body}</pre>
        </div>

        {!revealed ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => choose('real')}
              className="flex flex-col items-center gap-2 py-4 border border-slate-700 hover:border-emerald-500/60 hover:bg-emerald-500/5 rounded-xl transition-all group"
            >
              <CheckCircle2 className="w-6 h-6 text-slate-500 group-hover:text-emerald-400" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Legitimo</span>
            </button>
            <button
              onClick={() => choose('phishing')}
              className="flex flex-col items-center gap-2 py-4 border border-slate-700 hover:border-rose-500/60 hover:bg-rose-500/5 rounded-xl transition-all group"
            >
              <Shield className="w-6 h-6 text-slate-500 group-hover:text-rose-400" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Phishing</span>
            </button>
          </div>
        ) : (
          <div className="animate-fade-up">
            <div className={`flex items-start gap-3 p-4 rounded-xl border mb-4 ${email.isPhishing ? 'bg-rose-500/10 border-rose-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
              {lastChoice === (email.isPhishing ? 'phishing' : 'real') ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <p className="font-semibold text-white">
                  {lastChoice === (email.isPhishing ? 'phishing' : 'real') ? 'Correcto!' : 'Incorrecto.'}
                </p>
                <p className="text-slate-400 mt-0.5">
                  Este correo es <span className={email.isPhishing ? 'text-rose-400' : 'text-emerald-400'}>{email.isPhishing ? 'un intento de PHISHING' : 'LEGITIMO'}</span>.
                </p>
              </div>
            </div>

            {email.isPhishing && email.indicators.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Senales de Alarma Detectadas</p>
                </div>
                <ul className="space-y-1.5">
                  {email.indicators.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Eye className="w-3 h-3 text-amber-400/70 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={next}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-500 transition-all"
            >
              {idx + 1 >= phishingEmails.length ? 'Finalizar modulo' : 'Siguiente correo'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
