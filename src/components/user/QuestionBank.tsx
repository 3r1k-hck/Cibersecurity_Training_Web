import { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Filter, Layers, ChevronRight, Shield, Swords, Lock, Globe, Bug, Mail, Eye, ChevronDown } from 'lucide-react';
import { practiceQuestions } from '@/lib/data';
import type { QuizQuestion } from '@/lib/data';

type Mode = 'menu' | 'quiz' | 'results';

interface CategoryGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  categories: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'blue-team',
    label: 'Blue Team',
    icon: <Shield className="w-5 h-5" />,
    color: 'cyan',
    categories: ['Blue Team', 'Blue Team - Forense', 'Blue Team - Hardening', 'Blue Team - Respuesta a Incidentes', 'Blue Team - SIEM', 'Blue Team - Threat Hunting'],
  },
  {
    id: 'red-team',
    label: 'Red Team',
    icon: <Swords className="w-5 h-5" />,
    color: 'rose',
    categories: ['Red Team', 'Red Team - Explotación', 'Red Team - Pentesting', 'Red Team - Post-Explotación', 'Red Team - Reconocimiento'],
  },
  {
    id: 'fundamentos',
    label: 'Fundamentos de Seguridad',
    icon: <Lock className="w-5 h-5" />,
    color: 'emerald',
    categories: ['Contraseñas', 'Autenticación', 'Criptografía', 'Control de Acceso'],
  },
  {
    id: 'amenazas',
    label: 'Amenazas y Ataques',
    icon: <Bug className="w-5 h-5" />,
    color: 'amber',
    categories: ['Phishing', 'Ingeniería Social', 'Malware', 'Ataques', 'Vulnerabilidades'],
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura y Web',
    icon: <Globe className="w-5 h-5" />,
    color: 'blue',
    categories: ['Seguridad Web', 'Seguridad de Red', 'Seguridad Física'],
  },
];

const UNCATEGORIZED_GROUP: CategoryGroup = {
  id: 'otros',
  label: 'Otros',
  icon: <Eye className="w-5 h-5" />,
  color: 'slate',
  categories: ['Defensa'],
};

const ALL_GROUPS = [...CATEGORY_GROUPS, UNCATEGORIZED_GROUP];

const colorClasses: Record<string, { text: string; bg: string; border: string; gradient: string }> = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', gradient: 'from-cyan-500 to-blue-600' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', gradient: 'from-rose-500 to-red-600' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-600' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', gradient: 'from-amber-500 to-orange-600' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', gradient: 'from-blue-500 to-indigo-600' },
  slate: { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30', gradient: 'from-slate-500 to-slate-600' },
};

export default function QuestionBank() {
  const [mode, setMode] = useState<Mode>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<{ question: QuizQuestion; selected: number; correct: boolean }[]>([]);

  const existingCategories = useMemo(() => {
    const set = new Set(practiceQuestions.map((q) => q.category));
    return set;
  }, []);

  const activeGroups = useMemo(() => {
    return ALL_GROUPS
      .map((g) => ({
        ...g,
        categories: g.categories.filter((c) => existingCategories.has(c)),
      }))
      .filter((g) => g.categories.length > 0);
  }, [existingCategories]);

  const groupQuestionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const g of activeGroups) {
      counts[g.id] = g.categories.reduce((sum, cat) => {
        return sum + practiceQuestions.filter((q) => q.category === cat).length;
      }, 0);
    }
    return counts;
  }, [activeGroups]);

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

  function selectCategory(cat: string) {
    setSelectedCategory(cat);
    setExpandedGroup(null);
  }

  function selectGroup(g: CategoryGroup) {
    setSelectedCategory('Todas');
    setExpandedGroup(expandedGroup === g.id ? null : g.id);
  }

  function selectAllInGroup(g: CategoryGroup) {
    const groupQuestions = g.categories.flatMap((cat) =>
      practiceQuestions.filter((q) => q.category === cat),
    );
    if (groupQuestions.length > 0) {
      setSelectedCategory(`__group__${g.id}`);
      setExpandedGroup(null);
    }
  }

  const filteredQuestions = useMemo(() => {
    if (selectedCategory.startsWith('__group__')) {
      const groupId = selectedCategory.slice('__group__'.length);
      const group = activeGroups.find((g) => g.id === groupId);
      if (!group) return [];
      return practiceQuestions.filter((q) => group.categories.includes(q.category));
    }
    if (selectedCategory === 'Todas') return practiceQuestions;
    return practiceQuestions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory, activeGroups]);

  const activeQuestions = filteredQuestions;

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
            distribuidas en {activeGroups.length} areas principales.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-5">
          <button
            onClick={() => { selectCategory('Todas'); setExpandedGroup(null); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all mb-3 ${
              selectedCategory === 'Todas'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-950/40 border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-semibold">Todas las preguntas</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{practiceQuestions.length}</span>
          </button>

          <div className="space-y-2">
            {activeGroups.map((g) => {
              const colors = colorClasses[g.color];
              const isExpanded = expandedGroup === g.id;
              const count = groupQuestionCounts[g.id] || 0;
              const isGroupSelected = selectedCategory === `__group__${g.id}`;

              return (
                <div key={g.id} className={`rounded-xl border transition-all ${isExpanded ? `${colors.border} bg-slate-950/30` : 'border-slate-800 bg-slate-950/20'}`}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => selectGroup(g)}
                      className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isGroupSelected ? colors.bg : 'hover:bg-slate-800/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${colors.bg} ${colors.text}`}>
                          {g.icon}
                        </span>
                        <div className="text-left">
                          <p className={`text-sm font-semibold ${isGroupSelected ? colors.text : 'text-white'}`}>{g.label}</p>
                          <p className="text-[10px] text-slate-500">{g.categories.length} categorias</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{count}</span>
                        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 space-y-1 animate-fade-up">
                      <button
                        onClick={() => selectAllInGroup(g)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border transition-all ${
                          isGroupSelected
                            ? `${colors.bg} ${colors.border} ${colors.text} font-semibold`
                            : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" />
                          Todas las de {g.label}
                        </span>
                        <span className="font-mono">{count}</span>
                      </button>
                      {g.categories.map((cat) => {
                        const catCount = practiceQuestions.filter((q) => q.category === cat).length;
                        const isCatSelected = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => selectCategory(cat)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border transition-all ${
                              isCatSelected
                                ? `${colors.bg} ${colors.border} ${colors.text} font-semibold`
                                : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 opacity-40" />
                              {cat}
                            </span>
                            <span className="font-mono">{catCount}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" />
              <p className="text-sm font-semibold text-white">
                {selectedCategory === 'Todas'
                  ? 'Todas las preguntas'
                  : selectedCategory.startsWith('__group__')
                    ? activeGroups.find((g) => g.id === selectedCategory.slice('__group__'.length))?.label ?? 'Grupo'
                    : selectedCategory}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">{activeQuestions.length} preguntas</span>
          </div>
          <button
            onClick={startQuiz}
            disabled={activeQuestions.length === 0}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Comenzar prueba ({activeQuestions.length} preguntas)
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

  const q = activeQuestions[idx];

  if (!q) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center animate-fade-up">
        <p className="text-sm text-slate-400">No hay preguntas disponibles para esta seleccion.</p>
        <button onClick={restart} className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
          <RotateCcw className="w-4 h-4" /> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden animate-fade-up">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Banco de Preguntas</span>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {idx + 1} / {activeQuestions.length}
        </span>
      </div>

      <div className="px-5 py-1.5 bg-slate-950/30">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${(idx / activeQuestions.length) * 100}%` }}
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
            {idx + 1 >= activeQuestions.length ? 'Finalizar prueba' : 'Siguiente pregunta'}{' '}
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
