import { useState } from 'react';
import { Shield, Mail, MessageSquare, Phone, QrCode, Bell, CheckCircle2, XCircle, ArrowRight, Eye, Lightbulb, RotateCcw, Trophy, Flame, Snowflake, Zap } from 'lucide-react';
import { phishingEmails, type PhishingEmail, type PhishingChannel, type PhishingDifficulty } from '@/lib/data';
import type { PhishingAnswerRecord } from '@/types';
import type { SessionResult } from '@/types';

const MAX_QUESTIONS = 10;

function shuffleAndPick<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, items.length));
}

interface Props {
  onComplete: (result: Pick<SessionResult, 'phishingScore' | 'phishingAnswers'>) => void;
  bestScore: number;
}

const channelMeta: Record<PhishingChannel, { icon: React.ReactNode; label: string; hint: string }> = {
  email: { icon: <Mail className="w-4 h-4" />, label: 'Correo electronico', hint: 'Simulador de Bandeja de Entrada' },
  sms: { icon: <MessageSquare className="w-4 h-4" />, label: 'Mensaje SMS', hint: 'Simulador de Mensajes Moviles' },
  call: { icon: <Phone className="w-4 h-4" />, label: 'Llamada telefonica', hint: 'Simulador de Llamadas (Vishing)' },
  qr: { icon: <QrCode className="w-4 h-4" />, label: 'Codigo QR', hint: 'Simulador de Codigo QR (Quishing)' },
  push: { icon: <Bell className="w-4 h-4" />, label: 'Notificacion push', hint: 'Simulador de Notificaciones Push' },
};

const difficultyMeta: Record<PhishingDifficulty, { label: string; description: string; icon: React.ReactNode; color: string; ring: string; bg: string; text: string }> = {
  beginner: {
    label: 'Principiante',
    description: 'Correos y SMS obvios con dominios falsos, errores tipograficos y urgencia extrema. Ideal para empezar.',
    icon: <Snowflake className="w-5 h-5" />,
    color: 'emerald',
    ring: 'hover:border-emerald-500/60',
    bg: 'hover:bg-emerald-500/5',
    text: 'text-emerald-400',
  },
  intermediate: {
    label: 'Intermedio',
    description: 'Spear phishing, BEC, vishing y quishing con indicios sutiles. Requiere atencion al detalle.',
    icon: <Zap className="w-5 h-5" />,
    color: 'amber',
    ring: 'hover:border-amber-500/60',
    bg: 'hover:bg-amber-500/5',
    text: 'text-amber-400',
  },
  advanced: {
    label: 'Avanzado',
    description: 'Mensajes legitimos que parecen phishing, QR enganosos y push dificiles de clasificar. Para expertos.',
    icon: <Flame className="w-5 h-5" />,
    color: 'rose',
    ring: 'hover:border-rose-500/60',
    bg: 'hover:bg-rose-500/5',
    text: 'text-rose-400',
  },
};

const difficultyOrder: PhishingDifficulty[] = ['beginner', 'intermediate', 'advanced'];

function channelOf(e: PhishingEmail): PhishingChannel {
  return e.channel ?? 'email';
}

function difficultyOf(e: PhishingEmail): PhishingDifficulty {
  return e.difficulty ?? 'beginner';
}

function filterByDifficulty(items: PhishingEmail[], diff: PhishingDifficulty): PhishingEmail[] {
  return items.filter((e) => difficultyOf(e) === diff);
}

export default function PhishingGame({ onComplete, bestScore }: Props) {
  const [phase, setPhase] = useState<'select' | 'playing'>('select');
  const [difficulty, setDifficulty] = useState<PhishingDifficulty>('beginner');
  const [emails, setEmails] = useState<PhishingEmail[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<PhishingAnswerRecord[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [lastChoice, setLastChoice] = useState<'phishing' | 'real' | null>(null);
  const [finished, setFinished] = useState(false);

  function startGame(diff: PhishingDifficulty) {
    const pool = filterByDifficulty(phishingEmails, diff);
    setEmails(shuffleAndPick(pool, MAX_QUESTIONS));
    setDifficulty(diff);
    setIdx(0);
    setAnswers([]);
    setRevealed(false);
    setLastChoice(null);
    setFinished(false);
    setPhase('playing');
  }

  function backToSelect() {
    setPhase('select');
    setFinished(false);
  }

  const email = emails[idx];
  const ch = email ? channelOf(email) : 'email';
  const meta = channelMeta[ch];

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
    if (idx + 1 >= emails.length) {
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
    const pool = filterByDifficulty(phishingEmails, difficulty);
    setEmails(shuffleAndPick(pool, MAX_QUESTIONS));
    setIdx(0);
    setAnswers([]);
    setRevealed(false);
    setLastChoice(null);
    setFinished(false);
  }

  if (phase === 'select') {
    const counts: Record<PhishingDifficulty, number> = {
      beginner: filterByDifficulty(phishingEmails, 'beginner').length,
      intermediate: filterByDifficulty(phishingEmails, 'intermediate').length,
      advanced: filterByDifficulty(phishingEmails, 'advanced').length,
    };
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Selecciona tu nivel de dificultad</span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {difficultyOrder.map((diff) => {
            const dm = difficultyMeta[diff];
            return (
              <button
                key={diff}
                onClick={() => startGame(diff)}
                className={`w-full flex items-start gap-4 p-4 border border-slate-700 ${dm.ring} ${dm.bg} rounded-xl transition-all text-left group`}
              >
                <div className={`shrink-0 w-11 h-11 rounded-lg bg-${dm.color}-500/10 border border-${dm.color}-500/20 flex items-center justify-center ${dm.text}`}>
                  {dm.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white group-hover:text-slate-100">{dm.label}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-800 rounded-full px-2 py-0.5">{counts[diff]} escenarios</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{dm.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 shrink-0 mt-1 transition-colors" />
              </button>
            );
          })}
          <div className="pt-2">
            <p className="text-xs text-slate-500 text-center">
              Cada partida selecciona {MAX_QUESTIONS} mensajes al azar del nivel elegido.
              {bestScore > 0 && <span className="block mt-1">Tu mejor puntuacion: {bestScore} / {MAX_QUESTIONS}</span>}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const score = answers.reduce((s, a) => (a.correct ? s + 1 : s), 0);
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 mb-4">
          <Trophy className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Modulo de Phishing Completado</h3>
        <p className="text-slate-400 mt-2">Nivel <span className={difficultyMeta[difficulty].text + ' font-semibold'}>{difficultyMeta[difficulty].label}</span></p>
        <p className="text-slate-400 mt-1">Identificaste correctamente <span className="text-emerald-400 font-bold">{score}</span> de {emails.length} mensajes.</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={restart} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" /> Reintentar nivel
          </button>
          <button onClick={backToSelect} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
            <Shield className="w-4 h-4" /> Cambiar nivel
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-4">Tu mejor puntuacion hasta ahora: {bestScore} / {MAX_QUESTIONS}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="text-emerald-400">{meta.icon}</span>
          <span>{meta.hint}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-mono ${difficultyMeta[difficulty].text} bg-slate-800 rounded-full px-2 py-0.5`}>{difficultyMeta[difficulty].label}</span>
          <span className="text-xs font-mono text-slate-500">{idx + 1} / {emails.length}</span>
        </div>
      </div>

      <div className="px-5 py-1.5 bg-slate-950/30">
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500" style={{ width: `${((idx) / emails.length) * 100}%` }} />
        </div>
      </div>

      <div className="p-5">
        {ch === 'email' && <EmailCard email={email} />}
        {ch === 'sms' && <SmsCard email={email} />}
        {ch === 'call' && <CallCard email={email} />}
        {ch === 'qr' && <QrCard email={email} />}
        {ch === 'push' && <PushCard email={email} />}

        {!revealed ? (
          <div className="grid grid-cols-2 gap-3 mt-4">
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
          <div className="animate-fade-up mt-4">
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
                  Este {ch === 'email' ? 'correo' : ch === 'sms' ? 'SMS' : ch === 'call' ? 'mensaje de llamada' : ch === 'qr' ? 'codigo QR' : 'mensaje push'} es <span className={email.isPhishing ? 'text-rose-400' : 'text-emerald-400'}>{email.isPhishing ? 'un intento de PHISHING' : 'LEGITIMO'}</span>.
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
              {idx + 1 >= emails.length ? 'Finalizar modulo' : 'Siguiente mensaje'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmailCard({ email }: { email: PhishingEmail }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 mb-0.5">De</p>
          <p className="text-sm text-slate-200 font-medium truncate">{email.fromName} <span className="text-slate-500 font-mono">&lt;{email.from}&gt;</span></p>
        </div>
        <span className="text-xs text-slate-500 font-mono shrink-0">{email.date}</span>
      </div>
      <p className="text-sm font-semibold text-white mb-3">{email.subject}</p>
      <pre className="text-xs text-slate-400 font-mono whitespace-pre-wrap leading-relaxed">{email.body}</pre>
    </div>
  );
}

function SmsCard({ email }: { email: PhishingEmail }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-200 font-medium truncate">{email.fromName}</p>
          <p className="text-xs text-slate-500 font-mono truncate">{email.from}</p>
        </div>
        <span className="text-xs text-slate-500 font-mono shrink-0">{email.date}</span>
      </div>
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
        <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{email.body}</p>
      </div>
      <p className="text-xs text-slate-600 mt-2 text-right">SMS</p>
    </div>
  );
}

function CallCard({ email }: { email: PhishingEmail }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-full bg-cyan-500/15 flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-200 font-medium truncate">{email.fromName}</p>
          <p className="text-xs text-slate-500 font-mono truncate">{email.subject}</p>
        </div>
        <span className="text-xs text-slate-500 font-mono shrink-0">{email.date}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2 py-0.5">
          <Phone className="w-3 h-3" /> TRANSCRIPCION DE LLAMADA
        </span>
      </div>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3">
        <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed italic">{email.body}</p>
      </div>
    </div>
  );
}

function QrCard({ email }: { email: PhishingEmail }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
          <QrCode className="w-4 h-4 text-amber-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-200 font-medium truncate">{email.fromName}</p>
          <p className="text-xs text-slate-500 truncate">{email.subject}</p>
        </div>
        <span className="text-xs text-slate-500 font-mono shrink-0">{email.date}</span>
      </div>
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-24 h-24 bg-white rounded-xl flex items-center justify-center border border-slate-700">
          <QrCode className="w-16 h-16 text-slate-900" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5 inline-block mb-2">CODIGO QR ESCANEADO</p>
          <p className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">{email.body}</p>
        </div>
      </div>
    </div>
  );
}

function PushCard({ email }: { email: PhishingEmail }) {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4 text-violet-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-200 font-medium truncate">{email.fromName}</p>
          <p className="text-xs text-slate-500 truncate">{email.subject}</p>
        </div>
        <span className="text-xs text-slate-500 font-mono shrink-0">{email.date}</span>
      </div>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3">
        <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{email.body}</p>
      </div>
      <p className="text-xs text-slate-600 mt-2 text-right">Notificacion push</p>
    </div>
  );
}
