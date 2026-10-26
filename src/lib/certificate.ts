export interface CertificateData {
  username: string;
  score: number;
  total: number;
  date: number;
}

export function drawCertificate(ctx: CanvasRenderingContext2D, w: number, h: number, data: CertificateData) {
  const { username, score, total, date } = data;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0d9488');
  grad.addColorStop(0.5, '#0891b2');
  grad.addColorStop(1, '#0d9488');

  ctx.strokeStyle = grad;
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(38, 38, w - 76, h - 76);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 48px Georgia, serif';
  ctx.textAlign = 'center';
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
  ctx.fillStyle = '#0d9488';
  ctx.fillText('Concienciacion en Ciberseguridad', w / 2, 270);

  ctx.fillStyle = '#475569';
  ctx.font = '18px Georgia, serif';
  ctx.fillText('Se otorga este certificado a', w / 2, 320);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 32px Georgia, serif';
  ctx.fillText(username, w / 2, 365);

  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 2;
  const nameWidth = ctx.measureText(username).width;
  ctx.beginPath();
  ctx.moveTo(w / 2 - nameWidth / 2 - 10, 380);
  ctx.lineTo(w / 2 + nameWidth / 2 + 10, 380);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '16px Georgia, serif';
  ctx.fillText('por completar el modulo de quiz de seguridad', w / 2, 420);
  ctx.fillText(`con una puntuacion de ${score} de ${total} respuestas correctas`, w / 2, 444);

  const pct = Math.round((score / total) * 100);
  ctx.fillStyle = '#0d9488';
  ctx.font = 'bold 24px Georgia, serif';
  ctx.fillText(`(${pct}%)`, w / 2, 480);

  const d = new Date(date);
  const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('Fecha de finalizacion', 100, h - 100);
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
  ctx.fillStyle = '#0d9488';
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
}

export function downloadCertificate(data: CertificateData) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  drawCertificate(ctx, canvas.width, canvas.height, data);
  const link = document.createElement('a');
  link.download = `certificado-cybertrain-${data.username.replace(/\s+/g, '-').toLowerCase()}-${new Date(data.date).toISOString().split('T')[0]}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
