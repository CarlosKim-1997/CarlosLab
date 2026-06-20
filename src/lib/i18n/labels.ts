import type { ProjectKind, ProjectStatus } from "@/lib/project/types";

export const projectStatusLabels: Record<ProjectStatus, string> = {
  idea: "아이디어",
  prototype: "프로토타입",
  active: "진행 중",
  archived: "아카이브",
};

export const projectKindLabels: Record<ProjectKind, string> = {
  web: "웹",
  ai: "AI",
  tool: "도구",
  game: "게임",
  visual: "비주얼",
  research: "리서치",
  system: "시스템",
  other: "기타",
};

export const demoModeLabels: Record<string, string> = {
  none: "데모 없음",
  video: "영상",
  iframe: "웹",
  "local-component": "인터랙티브",
  sandbox: "샌드박스",
};
