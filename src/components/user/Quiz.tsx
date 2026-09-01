import { useState } from 'react';
import { Brain, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions } from '@/lib/data';
import type { QuizAnswerRecord } from '@/types';

interface Props {
  onComplete: (score: number, answers: QuizAnswerRecord[]) => void;
}

export default function Quiz({ onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[idx];

  function select(i: number) {
    if (revealed) return;
    setSelected(i);
  }

  function confirm() {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    setAnswers((a) => [...a, { questionId: q.id, selected, correct }]);
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= quizQuestions.length) {
      const score = answers.reduce((s, a) => (a.correct ? s + 1 : s), 0);
      setFinished(true);
      onComplete(score, answers);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function restart() {
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const score = answers.reduce((s, a) => (a.correct ? s + 1 : s), 0);
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/15 mb-4">
          <Trophy className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Quiz completado</h3>
        <p className="text-slate-400 mt-2">Tu puntuacion: <span className="text-cyan-400 font-bold">{score}</span> / {quizQuestions.length}.</p>
        <button onClick={restart} className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
          <RotateCcw className="w-4 h-4" /> Repetir Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span>Quiz de Conocimiento de Seguridad</span>
        </div>
        <span className="text-xs font-mono text-slate-500">{idx + 1} / {quizQuestions.length}</span>
      </div>

      <div className="px-5 py-1.5 bg-slate-950/30">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500" style={{ width: `${(idx / quizQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2.5 py-0.5 mb-3">{q.category}</span>
        <h3 className="text-base font-semibold text-white mb-4 leading-snug">{q.question}</h3>

        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === q.correctIndex;
            let cls = 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/40';
            if (revealed) {
              if (isCorrect) cls = 'border-emerald-500/60 bg-emerald-500/10';
              else if (isSelected) cls = 'border-rose-500/60 bg-rose-500/10';
              else cls = 'border-slate-800 opacity-60';
            } else if (isSelected) {
              cls = 'border-cyan-500/60 bg-cyan-500/10';
            }
            return (
              <button
                key={i}
                onClick={() => select(i)}
                disabled={revealed}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 border rounded-xl transition-all ${cls} ${revealed ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className={`w-6 h-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-mono ${
                  revealed && isCorrect ? 'border-emerald-500 text-emerald-400' :
                  revealed && isSelected ? 'border-rose-500 text-rose-400' :
                  isSelected ? 'border-cyan-500 text-cyan-400' : 'border-slate-600 text-slate-500'
                }`}>
                  {revealed && isCorrect ? <CheckCircle2 className="w-4 h-4" /> :
                   revealed && isSelected ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-slate-200">{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-4 animate-fade-up">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">Explicacion</p>
            <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {!revealed ? (
          <button
            onClick={confirm}
            disabled={selected === null}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-emerald-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirmar respuesta
          </button>
        ) : (
          <button
            onClick={next}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-emerald-500 transition-all"
          >
            {idx + 1 >= quizQuestions.length ? 'Finalizar quiz' : 'Siguiente pregunta'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
