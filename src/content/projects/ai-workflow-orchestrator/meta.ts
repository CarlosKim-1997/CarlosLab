import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "ai-workflow-orchestrator",
  title: "AI 워크플로우 오케스트레이터",
  subtitle: "엔터프라이즈 이메일·업무 프로세스를 AI로 자동 분류·연동하는 PoC.",
  status: "active",
  kind: "ai",
  year: 2026,
  summary:
    "고객 이메일을 LLM으로 분석하고 Jira·Slack·메일 회신까지 워크플로우로 자동화하는 컨설팅 프로토타입.",
  problem:
    "대기업 고객센터는 하루 수백 건의 문의를 수동 분류·배정하느라 시간과 긴급 건 누락 리스크가 큽니다.",
  solution:
    "플러그인 아키텍처 기반 오케스트레이터로 의도 분석 → 워크플로우 생성 → 엔터프라이즈 시스템 연동을 한 흐름으로 묶었습니다.",
  highlights: [
    "GPT 기반 이메일 의도·부서·우선순위 분석",
    "Jira / Slack / Email 플러그인 연동",
    "확장 가능한 IntegrationRegistry 설계",
  ],
  stack: ["Python", "Streamlit", "OpenAI", "Jira API", "Slack API"],
  links: {
    github: "https://github.com/CarlosKim-1997/AI-workflow-orchestrator",
    demo: "https://ai-workflow-orchestrator-caajghneidtpy6l8tncq9p.streamlit.app/",
  },
  demo: {
    mode: "iframe",
    url: "https://ai-workflow-orchestrator-caajghneidtpy6l8tncq9p.streamlit.app/",
    aspectRatio: "16/9",
    warning:
      "Streamlit Cloud 데모입니다. 첫 로드·유휴 후 재접속 시 수십 초 걸릴 수 있습니다.",
  },
  media: {
    cover: "/media/projects/ai-workflow-orchestrator/cover.webp",
    og: "/media/projects/ai-workflow-orchestrator/og.webp",
    screenshots: ["/media/projects/ai-workflow-orchestrator/screenshot-01.webp"],
  },
  visibility: "public",
  featured: true,
  priority: 100,
  deploy: {
    enabled: false,
    branch: "main",
    hookEnvKey: "VERCEL_HOOK_AI_WORKFLOW_ORCHESTRATOR",
  },
} satisfies ProjectMeta;

export default meta;
