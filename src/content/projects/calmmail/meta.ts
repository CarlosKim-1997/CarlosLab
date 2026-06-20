import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "calmmail",
  title: "CalmMail",
  subtitle: "Gmail을 위한 조용한 AI 백그라운드 동반자 — 이메일 클라이언트가 아닙니다.",
  status: "active",
  kind: "tool",
  year: 2026,
  summary:
    "규칙 엔진으로 inbox를 가볍게 감시하고, 필요할 때만 AI 브리핑을 생성하는 Electron 데스크톱 앱.",
  problem:
    "이메일 클라이언트는 알림과 AI 호출이 과해서, 정말 중요한 것만 조용히 알려주는 도구가 필요했습니다.",
  solution:
    "메일 본문은 저장하지 않고, 폴링·규칙 엔진만으로 스코어링한 뒤 사용자가 요청할 때만 AI 브리핑을 생성합니다.",
  highlights: [
    "이메일마다 AI 호출하지 않음",
    "OS 암호화 기반 시크릿 저장",
    "로컬 llama.cpp 런타임 옵션",
  ],
  stack: ["Electron", "React", "TypeScript", "SQLite", "Gmail API"],
  links: {
    github: "https://github.com/CarlosKim-1997/CalmMail",
  },
  demo: {
    mode: "none",
    warning: "데스크톱 앱이라 웹 데모는 준비 중입니다. GitHub에서 빌드·실행할 수 있습니다.",
  },
  media: {
    cover: "/media/projects/calmmail/cover.webp",
    og: "/media/projects/calmmail/og.webp",
    screenshots: ["/media/projects/calmmail/screenshot-01.webp"],
  },
  visibility: "public",
  featured: true,
  priority: 95,
  deploy: {
    enabled: false,
    branch: "main",
  },
} satisfies ProjectMeta;

export default meta;
