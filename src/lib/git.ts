import type { GitCommit } from '@/types';

const HEX = '0123456789abcdef';

export function gitHash(): string {
  let s = '';
  for (let i = 0; i < 7; i++) s += HEX[Math.floor(Math.random() * 16)];
  return s;
}

export function formatCommitLine(c: GitCommit): string {
  const d = new Date(c.date);
  const ds = d.toISOString().slice(0, 10);
  const time = d.toLocaleTimeString('es-ES', { hour12: false });
  return `commit ${c.hash.padEnd(7, ' ')}  ${ds} ${time}\nAuthor: ${c.author}\n\n    ${c.message}`;
}

export function formatGitLog(commits: GitCommit[]): string {
  return commits
    .slice()
    .sort((a, b) => b.date - a.date)
    .map(formatCommitLine)
    .join('\n\n');
}
