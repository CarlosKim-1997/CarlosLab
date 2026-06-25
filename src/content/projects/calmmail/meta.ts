import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "calmmail",
  title: "CalmMail",
  subtitle: "Gmail 백그라운드 감시 + 필요할 때만 AI 브리핑.",
  status: "active",
  kind: "tool",
  year: 2026,
  summary:
    "Electron 데스크톱 앱. 규칙 엔진으로 inbox를 가볍게 보고, 사용자가 요청할 때만 AI 브리핑을 생성합니다.",
  problem:
    "메일 앱은 알림과 AI 호출이 많아서, 정말 볼 것만 골라 주는 도구가 필요했습니다.",
  solution:
    "본문은 저장하지 않고 폴링·규칙으로 점수를 매깁니다. AI는 브리핑 요청 시에만 호출합니다.",
  highlights: [
    "메일마다 AI 호출하지 않음",
    "OS 암호화로 시크릿 저장",
    "로컬 llama.cpp 옵션",
  ],
  stack: ["Electron", "React", "TypeScript", "SQLite", "Gmail API"],
  links: {
    github: "https://github.com/CarlosKim-1997/CalmMail",
  },
  demo: {
    mode: "none",
    warning: "데스크톱 앱이라 웹 데모는 아직 없습니다. GitHub에서 빌드할 수 있습니다.",
  },
  media: {
    cover: "/media/projects/calmmail/cover.png",
    og: "/media/projects/calmmail/cover.png",
    screenshots: ["/media/projects/calmmail/cover.png"],
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
