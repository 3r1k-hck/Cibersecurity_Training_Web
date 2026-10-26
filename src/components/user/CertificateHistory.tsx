import { useMemo, useState } from 'react';
import { Award, Download, Mail, Send, CheckCircle2, Loader2, Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { downloadCertificate, type CertificateData } from '@/lib/certificate';

const MAX_QUIZ = 10;
const PASS_THRESHOLD = 0.7;

interface CertificateEntry {
  sessionId: number;
  username: string;
  quizScore: number;
  totalScore: number;
  completedAt: number;
}

export default function CertificateHistory() {
  const { currentUser, records } = useApp();
  const myRecord = records.find((r) => r.id === currentUser?.id);
  const [emailTarget, setEmailTarget] = useState<number | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const certificates = useMemo<CertificateEntry[]>(() => {
    if (!myRecord || !currentUser) return [];
    return myRecord.sessions
      .map((s, i) => ({
        sessionId: i,
        username: currentUser.username,
        quizScore: s.quizScore,
        totalScore: s.totalScore,
        completedAt: s.completedAt,
      }))
      .filter((s) => s.quizScore / MAX_QUIZ >= PASS_THRESHOLD)
      .sort((a, b) => b.completedAt - a.completedAt);
  }, [myRecord, currentUser]);

  function handleDownload(entry: CertificateEntry) {
    const data: CertificateData = {
      username: entry.username,
      score: entry.quizScore,
      total: MAX_QUIZ,
      date: entry.completedAt,
    };
    downloadCertificate(data);
  }

  function handleEmail(entry: CertificateEntry) {
    if (!recipientEmail) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) return;

    setSending(true);

    handleDownload(entry);

    const pct = Math.round((entry.quizScore / MAX_QUIZ) * 100);
    const dateStr = new Date(entry.completedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    const subject = `Certificado de CyberTrain - ${entry.username}`;
    const body = `Hola,\n\nAdjunto el certificado de finalizacion del modulo de concienciacion en ciberseguridad.\n\nEmpleado: ${entry.username}\nPuntuacion quiz: ${entry.quizScore}/${MAX_QUIZ} (${pct}%)\nPuntuacion total: ${entry.totalScore}/${MAX_QUIZ * 2}\nFecha: ${dateStr}\n\nEl archivo PNG del certificado se ha descargado automaticamente. Por favor, adjuntalo a este correo antes de enviarlo.\n\nSaludos,\nPlataforma CyberTrain`;

    const mailtoLink = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setSending(false);
      setSent(true);
      setTimeout(() => { setSent(false); setEmailTarget(null); setRecipientEmail(''); }, 5000);
    }, 800);
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
          <Award className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-white">Aun no tienes certificados</h3>
        <p className="text-slate-400 mt-2 text-sm">Completa el quiz de seguridad con al menos 70% de aciertos para obtener tu primer certificado.</p>
      </div>
    );
  }

  const bestQuiz = Math.max(...certificates.map((c) => c.quizScore));

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={<Award className="w-5 h-5" />} label="Certificados Obtenidos" value={certificates.length} color="amber" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Mejor Puntuacion Quiz" value={`${bestQuiz}/${MAX_QUIZ}`} color="emerald" />
        <StatCard icon={<Calendar className="w-5 h-5" />} label="Ultimo Certificado" value={new Date(certificates[0].completedAt).toLocaleDateString('es-ES', { dateStyle: 'short' })} color="cyan" />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-medium">Historial de Certificados</span>
            <span className="text-xs font-mono text-slate-500">[{certificates.length}]</span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60">
          {certificates.map((cert) => {
            const pct = Math.round((cert.quizScore / MAX_QUIZ) * 100);
            const dateStr = new Date(cert.completedAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' });
            const isEmailTarget = emailTarget === cert.sessionId;

            return (
              <div key={cert.sessionId} className="p-5 hover:bg-slate-800/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Certificado #{cert.sessionId + 1}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {dateStr}
                        </span>
                        <span className="text-xs text-emerald-400 font-mono">
                          Quiz: {cert.quizScore}/{MAX_QUIZ} ({pct}%)
                        </span>
                        <span className="text-xs text-cyan-400 font-mono">
                          Total: {cert.totalScore}/{MAX_QUIZ * 2}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDownload(cert)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Descargar
                    </button>
                    <button
                      onClick={() => { setEmailTarget(isEmailTarget ? null : cert.sessionId); setSent(false); setRecipientEmail(''); }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Enviar
                    </button>
                  </div>
                </div>

                {isEmailTarget && (
                  <div className="mt-4 bg-slate-950/50 border border-slate-800 rounded-xl p-4 animate-fade-up">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <p className="text-sm font-semibold text-white">Enviar este certificado por correo</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Introduce el correo del destinatario. Se abrira tu cliente de correo con el mensaje preparado y el certificado se descargara automaticamente.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="correo@empresa.com"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
                      />
                      <button
                        onClick={() => handleEmail(cert)}
                        disabled={!recipientEmail || sending}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-emerald-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Preparando...</>
                        ) : sent ? (
                          <><CheckCircle2 className="w-4 h-4" /> Enviado</>
                        ) : (
                          <><Send className="w-4 h-4" /> Enviar</>
                        )}
                      </button>
                    </div>
                    {sent && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 animate-fade-up">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>Se ha abierto tu cliente de correo y el certificado se ha descargado. Adjunta el archivo PNG al correo antes de enviarlo.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
  };
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${colors[color]}`}>{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}
