import { Database, Webhook, Github, Shield, ArrowRight, Server, Lock, GitBranch, Cloud } from 'lucide-react';

export default function ArchitectureDiagram() {
  return (
    <div className="space-y-5">
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">Arquitectura del Sistema</h2>
          <span className="text-[10px] font-mono text-slate-500 ml-1">v2.0 · Produccion</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          CyberTrain usa una arquitectura full-stack con base de datos PostgreSQL en Supabase, autenticacion real,
          seguridad a nivel de fila (RLS), registro de eventos API/webhook y auditoria versionada en Git.
          Cada capa se comunica de forma verificable y segura.
        </p>

        {/* Diagrama visual de capas */}
        <div className="space-y-3">
          {/* Capa 1: Cliente */}
          <Layer
            icon={<Shield className="w-4 h-4" />}
            title="Capa de Cliente (Navegador)"
            tech="React + TypeScript + Tailwind CSS"
            color="emerald"
            items={['Interfaz de alumno: simulador phishing + quiz', 'Panel de profesor: resumen, BD, API, Git', 'Autenticacion con sesion Supabase persistente']}
          />
          <Connector label="HTTPS / WebSocket · Supabase JS SDK" />

          {/* Capa 2: Auth */}
          <Layer
            icon={<Lock className="w-4 h-4" />}
            title="Capa de Autenticacion"
            tech="Supabase Auth (JWT + email/password)"
            color="cyan"
            items={['Registro e inicio de sesion real con bcrypt', 'Sesiones persistentes con auto-refresh', 'Trigger automatico: crea perfil al registrarse']}
          />
          <Connector label="auth.uid() · verificado en cada peticion" />

          {/* Capa 3: Base de datos */}
          <Layer
            icon={<Database className="w-4 h-4" />}
            title="Capa de Datos"
            tech="PostgreSQL (Supabase) · 5 tablas + RLS"
            color="blue"
            items={['profiles (usuarios + roles)', 'sessions (intentos de entrenamiento)', 'session_answers (respuestas detalladas)', 'api_logs (eventos API)', 'audit_commits (historial Git)']}
          />
          <Connector label="Politicas RLS: cada alumno ve solo sus datos · profesores ven todo" />

          {/* Capa 4: API / Webhook */}
          <Layer
            icon={<Webhook className="w-4 h-4" />}
            title="Capa de API / Webhook"
            tech="REST simulado + registro de eventos"
            color="amber"
            items={['POST /api/v1/auth/register — registro de alumnos', 'POST /api/v1/auth/login — inicio de sesion', 'POST /api/v1/sessions/submit — envio de puntuaciones', 'Cada evento se almacena en api_logs con cabeceras, body y respuesta']}
          />
          <Connector label="Webhook dispatch → GitHub audit repo" />

          {/* Capa 5: Git */}
          <Layer
            icon={<Github className="w-4 h-4" />}
            title="Capa de Auditoria Git"
            tech="Commits simulados · github.com/cybtrain/audit"
            color="violet"
            items={['Cada accion genera un commit de auditoria', 'Tipos: feat, fix, chore, audit, docs', 'Hash unico por commit · historial inmutable', 'Terminal Git en vivo en el panel del profesor']}
          />
        </div>
      </div>

      {/* Flujo de datos */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Flujo de Datos en Tiempo Real</h3>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch gap-2">
          <FlowStep num="1" label="Alumno completa quiz" icon={<Shield className="w-4 h-4" />} color="emerald" />
          <FlowArrow />
          <FlowStep num="2" label="Insert en sessions + session_answers" icon={<Database className="w-4 h-4" />} color="blue" />
          <FlowArrow />
          <FlowStep num="3" label="Evento POST /sessions/submit" icon={<Webhook className="w-4 h-4" />} color="amber" />
          <FlowArrow />
          <FlowStep num="4" label="Commit de auditoria" icon={<Github className="w-4 h-4" />} color="violet" />
        </div>
        <p className="text-[11px] text-slate-500 mt-4 font-mono">
          Cada paso se ejecuta secuencialmente. Si falla uno, los anteriores ya estan confirmados (idempotente).
          El profesor ve los resultados en su panel en tiempo real.
        </p>
      </div>

      {/* Tabla de detalles tecnicos */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Cloud className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">Detalles Tecnicos del Despliegue</span>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 bg-slate-950/30">
                <th className="text-left font-medium px-5 py-2.5">Componente</th>
                <th className="text-left font-medium px-3 py-2.5">Tecnologia</th>
                <th className="text-left font-medium px-3 py-2.5 hidden sm:table-cell">Funcion</th>
                <th className="text-left font-medium px-5 py-2.5">Estado</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <TechRow name="Frontend" tech="React 18 + Vite" func="SPA con routing por rol" status="Operativo" statusColor="emerald" />
              <TechRow name="Base de Datos" tech="PostgreSQL 15 (Supabase)" func="5 tablas relacionales con RLS" status="Operativo" statusColor="emerald" />
              <TechRow name="Autenticacion" tech="Supabase Auth" func="Email/password + JWT + sesion persistente" status="Operativo" statusColor="emerald" />
              <TechRow name="Seguridad RLS" tech="Politicas por tabla" func="Alumnos ven solo sus datos · profesores ven todo" status="Activo" statusColor="emerald" />
              <TechRow name="API REST" tech="Simulado en cliente" func="Registro de eventos con cabeceras y body" status="Operativo" statusColor="emerald" />
              <TechRow name="Webhook" tech="Dispatch simulado" func="Notificacion a GitHub por cada accion" status="Operativo" statusColor="emerald" />
              <TechRow name="Auditoria Git" tech="Commits simulados" func="Historial inmutable de acciones del sistema" status="Sincronizando" statusColor="cyan" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Layer({ icon, title, tech, items, color }: {
  icon: React.ReactNode; title: string; tech: string; items: string[]; color: string;
}) {
  const colors: Record<string, string> = {
    emerald: 'border-emerald-500/40 bg-emerald-500/5',
    cyan: 'border-cyan-500/40 bg-cyan-500/5',
    blue: 'border-blue-500/40 bg-blue-500/5',
    amber: 'border-amber-500/40 bg-amber-500/5',
    violet: 'border-violet-500/40 bg-violet-500/5',
  };
  const iconColors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/15',
    cyan: 'text-cyan-400 bg-cyan-500/15',
    blue: 'text-blue-400 bg-blue-500/15',
    amber: 'text-amber-400 bg-amber-500/15',
    violet: 'text-violet-400 bg-violet-500/15',
  };
  return (
    <div className={`border rounded-xl p-4 ${colors[color]} animate-fade-up`}>
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${iconColors[color]}`}>{icon}</div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-[10px] font-mono text-slate-400">{tech}</p>
        </div>
      </div>
      <ul className="space-y-1 ml-10.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
            <span className="text-slate-600 mt-0.5">-</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <ArrowRight className="w-3.5 h-3.5 text-slate-600 rotate-90" />
      <span className="text-[10px] font-mono text-slate-500">{label}</span>
      <ArrowRight className="w-3.5 h-3.5 text-slate-600 rotate-90" />
    </div>
  );
}

function FlowStep({ num, label, icon, color }: { num: string; label: string; icon: React.ReactNode; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    blue: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    violet: 'border-violet-500/40 bg-violet-500/10 text-violet-400',
  };
  return (
    <div className={`flex-1 border rounded-xl p-3 ${colors[color]} flex items-center gap-3`}>
      <span className="text-lg font-bold opacity-30">{num}</span>
      <div className="shrink-0">{icon}</div>
      <p className="text-xs text-white font-medium">{label}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center">
      <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 lg:rotate-0" />
    </div>
  );
}

function TechRow({ name, tech, func, status, statusColor }: {
  name: string; tech: string; func: string; status: string; statusColor: string;
}) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
  };
  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/20 transition-colors">
      <td className="px-5 py-2.5 font-medium text-white">{name}</td>
      <td className="px-3 py-2.5 font-mono text-cyan-300">{tech}</td>
      <td className="px-3 py-2.5 text-slate-400 hidden sm:table-cell">{func}</td>
      <td className="px-5 py-2.5">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full ${colors[statusColor]}`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />
          {status}
        </span>
      </td>
    </tr>
  );
}
