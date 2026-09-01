import { useMemo } from 'react';

interface Point {
  label: string;
  value: number;
}

/** Animated line + area chart rendered as SVG. */
export function LineChart({ data, color = '#22c55e', height = 180 }: { data: Point[]; color?: string; height?: number }) {
  const W = 520;
  const H = height;
  const pad = { top: 16, right: 16, bottom: 28, left: 36 };
  const iw = W - pad.left - pad.right;
  const ih = H - pad.top - pad.bottom;
  const max = Math.max(10, ...data.map((d) => d.value));

  const pts = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, i) => {
      const x = pad.left + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
      const y = pad.top + ih - (d.value / max) * ih;
      return { x, y, ...d };
    });
  }, [data, max, iw, ih, pad.left, pad.top]);

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = pts.length
    ? `M ${pts[0].x} ${pad.top + ih} ` + pts.map((p) => `L ${p.x} ${p.y}`).join(' ') + ` L ${pts[pts.length - 1].x} ${pad.top + ih} Z`
    : '';
  const gridYs = [0, 0.25, 0.5, 0.75, 1].map((t) => pad.top + ih - t * ih);

  if (data.length === 0) {
    return <div className="flex items-center justify-center text-slate-600 text-sm" style={{ height }}>Sin datos aún</div>;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`area-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridYs.map((y, i) => (
        <g key={i}>
          <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
          <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#64748b" className="font-mono">
            {Math.round(max * (1 - i / 4))}
          </text>
        </g>
      ))}
      {areaPath && <path d={areaPath} fill={`url(#area-${color.slice(1)})`} />}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill="#05070d" stroke={color} strokeWidth="2" />
          <text x={p.x} y={H - 10} textAnchor="middle" fontSize="9" fill="#64748b" className="font-mono">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

interface BarDatum { label: string; value: number; color?: string }

export function BarChart({ data, height = 200 }: { data: BarDatum[]; height?: number }) {
  const W = 520;
  const H = height;
  const pad = { top: 16, right: 16, bottom: 32, left: 36 };
  const iw = W - pad.left - pad.right;
  const ih = H - pad.top - pad.bottom;
  const max = Math.max(10, ...data.map((d) => d.value));
  const bw = data.length ? iw / data.length * 0.6 : 0;
  const gap = data.length ? iw / data.length * 0.4 : 0;

  if (data.length === 0) {
    return <div className="flex items-center justify-center text-slate-600 text-sm" style={{ height }}>Sin datos aún</div>;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = pad.top + ih - t * ih;
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
            <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#64748b" className="font-mono">
              {Math.round(max * (1 - i / 4))}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.value / max) * ih;
        const x = pad.left + i * (bw + gap) + gap / 2;
        const y = pad.top + ih - h;
        const c = d.color ?? '#22c55e';
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx="3" fill={c} opacity="0.85">
              <title>{d.label}: {d.value}</title>
            </rect>
            <text x={x + bw / 2} y={H - 10} textAnchor="middle" fontSize="9" fill="#94a3b8" className="font-mono">
              {d.label.length > 10 ? d.label.slice(0, 9) + '…' : d.label}
            </text>
            <text x={x + bw / 2} y={y - 4} textAnchor="middle" fontSize="9" fill={c} className="font-mono font-bold">
              {d.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Donut chart with center label. */
export function DonutChart({ segments, size = 160 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="14" />
        {total > 0 && segments.map((s, i) => {
          const len = (s.value / total) * C;
          const el = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return el;
        })}
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="22" fontWeight="700" fill="#e2e8f0">{total}</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="9" fill="#64748b" className="font-mono">TOTAL</text>
        {/* "TOTAL" label - widely understood in Spanish data viz contexts */}
      </svg>
      <div className="space-y-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-slate-300">{s.label}</span>
            <span className="text-slate-500 font-mono ml-auto">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
