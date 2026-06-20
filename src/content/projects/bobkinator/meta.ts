import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "bobkinator",
  title: "밥키네이터 (Bobkinator)",
  subtitle: "오늘 뭐 먹지? — 메뉴 고민을 조용히 끝내주는 모바일 앱.",
  status: "active",
  kind: "tool",
  year: 2026,
  summary:
    "정확한 AI 추천이 아니라 사고량을 줄이는 음식 결정 경험. 메인 1 + 대안 2만 보여 줍니다.",
  problem:
    "배달·지도 앱은 선택지가 너무 많아 ‘뭐 먹지’ 고민 자체가 피로가 됩니다.",
  solution:
    "현재 상태 기반 짧은 질문 → 점수·다양성 엔진 → 메인 1 + 대안 2 고정. 결과 전 광고 없음.",
  highlights: [
    "메인 1 + 대안 2 고정 UX",
    "위치 없이도 100% 동작",
    "Expo + Zustand 추천 파이프라인",
  ],
  stack: ["Expo", "React Native", "TypeScript", "Zustand", "Supabase"],
  links: {
    github: "https://github.com/CarlosKim-1997/Bobkinator",
  },
  demo: {
    mode: "none",
    warning:
      "Expo Web 빌드 후 Vercel/EAS Hosting에 배포해 iframe으로 연결 예정. (react-native-web 설치·export 작업 진행 중)",
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
