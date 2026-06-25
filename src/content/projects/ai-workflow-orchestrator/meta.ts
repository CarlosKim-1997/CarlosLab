import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "ai-workflow-orchestrator",
  title: "AI 워크플로우 오케스트레이터",
  subtitle: "고객 이메일 분류 → Jira·Slack·회신까지 한 흐름으로.",
  status: "active",
  kind: "ai",
  year: 2026,
  summary:
    "들어온 이메일을 LLM으로 분류하고, 규칙에 맞는 워크플로우를 만든 뒤 Jira·Slack·메일 회신까지 실행하는 Streamlit PoC.",
  problem:
    "고객센터는 하루 수백 건의 메일을 사람이 분류·배정합니다. 긴급 건이 묻히기 쉽습니다.",
  solution:
    "의도 분석 → 워크플로우 생성 → 플러그인으로 외부 시스템 연동. 새 연동은 레지스트리에 등록만 하면 됩니다.",
  highlights: [
    "이메일 의도·부서·우선순위 분류",
    "Jira / Slack / Email 플러그인",
    "IntegrationRegistry로 확장",
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
    warning: "Streamlit Cloud 데모입니다. 한동안 안 쓰면 첫 로드가 30초쯤 걸릴 수 있습니다.",
  },
  media: {
    cover: "/media/projects/ai-workflow-orchestrator/cover.png",
    og: "/media/projects/ai-workflow-orchestrator/cover.png",
    screenshots: ["/media/projects/ai-workflow-orchestrator/cover.png"],
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
