import { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Filter, Layers } from 'lucide-react';
import { practiceQuestions } from '@/lib/data';
import type { QuizQuestion } from '@/lib/data';

type Mode = 'menu' | 'quiz' | 'results';

export default function QuestionBank() {
  const [mode, setMode] = useState<Mode>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<{ question: QuizQuestion; selected: number; correct: boolean }[]>([]);

  const categories = useMemo(() => {
    const set = new Set(practiceQuestions.map((q) => q.category));
    return ['Todas', ...Array.from(set).sort()];
  }, []);

  const questions = useMemo(() => {
    if (selectedCategory === 'Todas') return practiceQuestions;
    return practiceQuestions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  function startQuiz() {
    setMode('quiz');
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
  }

  function confirm() {
    if (selected === null) return;
    const q = questions[idx];
    const correct = selected === q.correctIndex;
    setAnswers((a) => [...a, { question: q, selected, correct }]);
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setMode('results');
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function restart() {
    setMode('menu');
    setIdx(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
  }

  if (mode === 'menu') {
    return (
      <div className="space-y-4 animate-fade-up">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 mb-3">
            <BookOpen className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Banco de Preguntas</h3>
          <p className="text-sm text-slate-400 mt-1.5 max-w-md mx-auto">
            Pon a prueba tu conocimiento en ciberseguridad con {practiceQuestions.length} preguntas
            distribuidas en {categories.length - 1} categorías.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-cyan-400" />
            <p className="text-sm font-semibold text-white">Elige una categoría</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat === 'Todas'
                ? practiceQuestions.length
                : practiceQuestions.filter((q) => q.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950/40 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  {cat}
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <p className="text-sm font-semibold text-white">
                {selectedCategory === 'Todas' ? 'Todas las preguntas' : selectedCategory}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">{questions.length} preguntas</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {categories.slice(1).map((cat) => {
              const count = practiceQuestions.filter((q) => q.category === cat).length;
              return (
                <div key={cat} className="bg-slate-950/40 border border-slate-800 rounded-lg p-2.5 text-center">
                  <p className="text-lg font-bold text-emerald-400">{count}</p>
                  <p className="text-[10px] text-slate-500 truncate">{cat}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={startQuiz}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-500 transition-all"
          >
            Comenzar prueba
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    const score = answers.reduce((s, a) => (a.correct ? s + 1 : s), 0);
    const pct = Math.round((score / answers.length) * 100);
    return (
      <div className="space-y-4 animate-fade-up">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/15 mb-4">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Prueba completada</h3>
          <p className="text-slate-400 mt-2">
            Has respondido correctamente <span className="text-emerald-400 font-bold">{score}</span> de{' '}
            <span className="text-white font-bold">{answers.length}</span> preguntas.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-800">
            <span className="text-2xl font-bold text-cyan-400">{pct}%</span>
            <span className="text-xs text-slate-500">aciertos</span>
          </div>
          <div className="mt-6">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Volver al inicio
            </button>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <p className="text-sm font-semibold text-white mb-3">Revisión de respuestas</p>
          <div className="space-y-2">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  a.correct
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-rose-500/5 border-rose-500/20'
                }`}
              >
                {a.correct ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-300 font-medium">{a.question.question}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    <span className="text-slate-400">Tu respuesta:</span>{' '}
                    {a.question.options[a.selected]}
                  </p>
                  {!a.correct && (
                    <p className="text-[11px] text-emerald-400 mt-0.5">
                      <span className="text-slate-400">Correcta:</span>{' '}
                      {a.question.options[a.question.correctIndex]}
                    </p>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-600 shrink-0">{a.question.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden animate-fade-up">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Banco de Preguntas</span>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {idx + 1} / {questions.length}
        </span>
      </div>

      <div className="px-5 py-1.5 bg-slate-950/30">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${(idx / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2.5 py-0.5 mb-3">
          {q.category}
        </span>
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
                className={`w-full flex items-center gap-3 text-left px-4 py-3 border rounded-xl transition-all ${cls} ${
                  revealed ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span
                  className={`w-6 h-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-mono ${
                    revealed && isCorrect
                      ? 'border-emerald-500 text-emerald-400'
                      : revealed && isSelected
                        ? 'border-rose-500 text-rose-400'
                        : isSelected
                          ? 'border-cyan-500 text-cyan-400'
                          : 'border-slate-600 text-slate-500'
                  }`}
                >
                  {revealed && isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : revealed && isSelected ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-sm text-slate-200">{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-4 animate-fade-up">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-1">Explicación</p>
            <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {!revealed ? (
          <button
            onClick={confirm}
            disabled={selected === null}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirmar respuesta
          </button>
        ) : (
          <button
            onClick={next}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-500 transition-all"
          >
            {idx + 1 >= questions.length ? 'Finalizar prueba' : 'Siguiente pregunta'}{' '}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  function select(i: number) {
    if (revealed) return;
    setSelected(i);
  }
}
