/** Muted, distinct domain colors for charts (Dark Ink — no neon cyan/emerald). */
export const domainPalette: Record<string, string> = {
  "사고법·문제해결": "#b8956a",
  "AI·에이전트·메모리": "#9a8aaf",
  "제품·서비스": "#7a9a7a",
  "게임·인터랙션": "#c48a9a",
  "Physical AI·로봇": "#c4946a",
  "소설·세계관": "#c9b05a",
  "인간·인지·커뮤니케이션": "#7a8fa8",
  "사회·경제·시스템": "#b87a72",
  "기계·발명": "#8a8580",
};

export function domainColor(domain: string) {
  return domainPalette[domain] ?? "#78716c";
}
