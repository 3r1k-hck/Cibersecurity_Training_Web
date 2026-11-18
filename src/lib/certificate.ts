export type CertificateCourse = 'quiz' | 'phishing';

export interface CertificateData {
  username: string;
  score: number;
  total: number;
  date: number;
  course: CertificateCourse;
}

function verificationCode(data: CertificateData): string {
  const seed = `${data.course}-${data.username}-${data.score}-${data.total}-${data.date}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x1000193;
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ (c + 0x9e3779b9), 0x85ebca6b) >>> 0;
  }
  const hex = (h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0')).toUpperCase();
  return `${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}`;
}

interface CourseStyle {
  requirement: string;
  resultLabel: string;
  subtitle: string;
  accent: string;
  accentMid: string;
  thin: string;
}

const COURSE_STYLES: Record<CertificateCourse, CourseStyle> = {
  quiz: {
    requirement: 'por completar el modulo de quiz de seguridad',
    resultLabel: 'respuestas correctas',
    subtitle: 'Concienciación en Ciberseguridad',
    accent: '#0d9488',
    accentMid: '#0891b2',
    thin: '#0891b2',
  },
  phishing: {
    requirement: 'por completar el juego de deteccion de phishing',
    resultLabel: 'mensajes identificados correctamente',
    subtitle: 'Detección de Phishing y Ingenieria Social',
    accent: '#b45309',
    accentMid: '#d97706',
    thin: '#b45309',
  },
};

function drawSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, accent: string) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.beginPath();
  ctx.arc(0, 0, 78, 0, Math.PI * 2);
  ctx.fillStyle = `${accent}14`;
  ctx.fill();

  for (let i = 0; i < 2; i++) {
    const r = 78 - i * 8;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = i === 0 ? accent : `${accent}99`;
    ctx.lineWidth = i === 0 ? 2.5 : 1;
    ctx.stroke();
  }

  const spokes = 12;
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2;
    const r1 = 70;
    const r2 = 64;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
    ctx.strokeStyle = `${accent}80`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(0, 0, 54, 0, Math.PI * 2);
  ctx.fillStyle = `${accent}1f`;
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.font = 'bold 20px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PHISH', 0, -12);
  ctx.fillText('EXPERT', 0, 14);

  ctx.font = 'bold 9px Georgia, serif';
  ctx.fillStyle = `${accent}cc`;
  ctx.fillText('SELLO DE APTITUD', 0, 38);

  ctx.restore();
}

export function drawCertificate(ctx: CanvasRenderingContext2D, w: number, h: number, data: CertificateData) {
  const { username, score, total, date, course } = data;
  const s = COURSE_STYLES[course];

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, s.accent);
  grad.addColorStop(0.5, s.accentMid);
  grad.addColorStop(1, s.accent);

  ctx.strokeStyle = grad;
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  ctx.strokeStyle = s.thin;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(38, 38, w - 76, h - 76);

  if (course === 'phishing') {
    ctx.save();
    ctx.strokeStyle = `${s.accent}33`;
    ctx.lineWidth = 1;
    const step = 22;
    for (let x = 52; x < w - 52; x += step) {
      for (let y = 52; y < h - 52; y += step) {
        ctx.beginPath();
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x + 3, y);
        ctx.moveTo(x, y - 3);
        ctx.lineTo(x, y + 3);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 48px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('CyberTrain', w / 2, 110);

  ctx.fillStyle = '#64748b';
  ctx.font = '16px Georgia, serif';
  ctx.fillText('CERTIFICADO DE FINALIZACION', w / 2, 145);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 140, 165);
  ctx.lineTo(w / 2 + 140, 165);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '36px Georgia, serif';
  ctx.fillText('Certificado de Formacion en', w / 2, 230);
  ctx.font = 'bold 36px Georgia, serif';
  ctx.fillStyle = s.accent;
  ctx.fillText(s.subtitle, w / 2, 270);

  ctx.fillStyle = '#475569';
  ctx.font = '18px Georgia, serif';
  ctx.fillText('Se otorga este certificado a', w / 2, 320);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 32px Georgia, serif';
  ctx.fillText(username, w / 2, 365);

  ctx.strokeStyle = s.thin;
  ctx.lineWidth = 2;
  const nameWidth = ctx.measureText(username).width;
  ctx.beginPath();
  ctx.moveTo(w / 2 - nameWidth / 2 - 10, 380);
  ctx.lineTo(w / 2 + nameWidth / 2 + 10, 380);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '16px Georgia, serif';
  ctx.fillText(s.requirement, w / 2, 420);
  ctx.fillText(`con una puntuacion de ${score} de ${total} ${s.resultLabel}`, w / 2, 444);

  const pct = Math.round((score / total) * 100);
  ctx.fillStyle = s.accent;
  ctx.font = 'bold 24px Georgia, serif';
  ctx.fillText(`(${pct}%)`, w / 2, 480);

  if (course === 'phishing') {
    drawSeal(ctx, w - 175, 545, s.accent);
  }

  const d = new Date(date);
  const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px Georgia, serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Fecha de finalización', 100, h - 100);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px Georgia, serif';
  ctx.fillText(dateStr, 100, h - 78);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, h - 68);
  ctx.lineTo(320, h - 68);
  ctx.stroke();

  ctx.textAlign = 'right';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px Georgia, serif';
  ctx.fillText('Firma digital', w - 100, h - 100);
  ctx.fillStyle = s.accent;
  ctx.font = 'italic bold 22px Georgia, serif';
  ctx.fillText('CyberTrain', w - 100, h - 78);
  ctx.strokeStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(w - 320, h - 68);
  ctx.lineTo(w - 100, h - 68);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px Georgia, serif';
  ctx.fillText('CyberTrain Platform - Certificado verificado electronicamente', w / 2, h - 45);

  const vCode = verificationCode(data);

  ctx.strokeStyle = `${s.thin}66`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 130, h - 35);
  ctx.lineTo(w / 2 + 130, h - 35);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '11px Georgia, serif';
  ctx.fillText('Codigo de verificación', w / 2, h - 22);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px Georgia, serif';
  ctx.fillText(vCode, w / 2, h - 8);
}

export function downloadCertificate(data: CertificateData) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  drawCertificate(ctx, canvas.width, canvas.height, data);
  const vCode = verificationCode(data);
  const link = document.createElement('a');
  link.download = `certificado-cybertrain-${data.username.replace(/\s+/g, '-').toLowerCase()}-${new Date(data.date).toISOString().split('T')[0]}-${vCode}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
