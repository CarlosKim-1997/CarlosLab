import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "bobkinator",
  title: "밥키네이터",
  subtitle: "오늘 뭐 먹지 — 메뉴 1개 + 대안 2개만 보여 줍니다.",
  status: "active",
  kind: "tool",
  year: 2026,
  summary:
    "Expo 모바일 앱. 짧은 질문 몇 개 후 메인 1 + 대안 2만 제시하고 고민을 끝냅니다.",
  problem:
    "배달·지도 앱은 선택지가 너무 많아 ‘뭐 먹지’가 피로가 됩니다.",
  solution:
    "상태 기반 질문 → 점수·다양성 엔진 → 결과 3개 고정. 결과 화면 전까지 광고 없음.",
  highlights: [
    "메인 1 + 대안 2 고정",
    "위치 없이도 동작",
    "Expo + Zustand",
  ],
  stack: ["Expo", "React Native", "TypeScript", "Zustand", "Supabase"],
  links: {
    github: "https://github.com/CarlosKim-1997/Bobkinator",
  },
  demo: {
    mode: "none",
    warning: "Expo Web 빌드 후 iframe 연결 예정입니다.",
  },
  media: {
    cover: "/media/projects/bobkinator/cover.webp",
    og: "/media/projects/bobkinator/og.webp",
    screenshots: ["/media/projects/bobkinator/screenshot-01.webp"],
  },
  visibility: "public",
  featured: false,
  priority: 80,
  deploy: {
    enabled: false,
    branch: "main",
  },
} satisfies ProjectMeta;

export default meta;
