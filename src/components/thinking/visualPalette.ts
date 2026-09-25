export const domainPalette: Record<string, string> = {
  "사고법·문제해결": "#22d3ee",
  "AI·에이전트·메모리": "#a78bfa",
  "제품·서비스": "#34d399",
  "게임·인터랙션": "#f472b6",
  "Physical AI·로봇": "#fb923c",
  "소설·세계관": "#facc15",
  "인간·인지·커뮤니케이션": "#60a5fa",
  "사회·경제·시스템": "#f87171",
  "기계·발명": "#94a3b8",
};

export function domainColor(domain: string) {
  return domainPalette[domain] ?? "#71717a";
}
