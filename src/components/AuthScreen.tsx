import { useState } from 'react';
import { Shield, Lock, Mail, User as UserIcon, Eye, EyeOff, AlertTriangle, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AuthScreen() {
  const { register, login, loading } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (mode === 'register') {
      if (!username.trim() || !email.trim() || !password) {
        setError('Todos los campos son obligatorios.');
        setSubmitting(false);
        return;
      }
      if (password.length < 6) {
        setError('La contrasena debe tener al menos 6 caracteres.');
        setSubmitting(false);
        return;
      }
      const res = await register({ username, email, password });
      if (!res.ok) {
        setError(res.error ?? 'Error al registrar.');
        setSubmitting(false);
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setError('Introduce tu correo y contrasena.');
        setSubmitting(false);
        return;
      }
      const res = await login(email, password);
      if (!res.ok) {
        setError(res.error ?? 'Error al iniciar sesion.');
        setSubmitting(false);
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05070d] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/30 mb-4">
            <Shield className="w-9 h-9 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CyberTrain</h1>
          <p className="text-sm text-slate-400 mt-1">Plataforma de Formacion en Ciberseguridad</p>
        </div>

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex gap-1 p-1 bg-slate-950/50 rounded-lg mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === 'login' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Iniciar Sesion
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === 'register' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Crear Cuenta
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <Field label="Usuario" icon={<UserIcon className="w-4 h-4" />}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="jdoe"
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </Field>
            )}
            <Field label="Correo" icon={<Mail className="w-4 h-4" />}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </Field>
            <Field label="Contrasena" icon={<Lock className="w-4 h-4" />}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 6 caracteres"
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button type="button" onClick={() => setShowPass((v) => !v)} className="text-slate-500 hover:text-slate-300">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </Field>

            {error && (
              <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-cyan-500 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' ? 'Iniciar Sesion' : 'Crear Cuenta y Empezar'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-500 space-y-1">
            <p className="font-mono text-emerald-500/70">Crea tu cuenta o usa la de admin:</p>
            <p>Correo admin: <span className="text-slate-300 font-mono">admin@cybtrain.io</span></p>
            <p>Contrasena admin: <span className="text-slate-300 font-mono">admin123456</span></p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-600 mt-6">
          Autenticacion Supabase · Base de datos PostgreSQL · Seguridad a nivel de fila (RLS)
        </p>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-2 bg-slate-950/50 border border-slate-700 rounded-lg px-3 py-2.5 focus-within:border-emerald-500/60 transition-colors">
        <span className="text-slate-500">{icon}</span>
        {children}
      </div>
    </div>
  );
}
