import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "secure-hybrid-rag-enterprise-assistant",
  title: "Secure Hybrid RAG Enterprise Assistant",
  subtitle: "내부 문서는 로컬, 질문 분석만 외부 — 보안 하이브리드 RAG PoC.",
  status: "active",
  kind: "ai",
  year: 2026,
  summary:
    "사용자 질문만 외부 LLM으로 계획하고, FAISS 검색·답변 생성은 로컬 Ollama에서 처리하는 기업용 RAG 어시스턴트.",
  problem:
    "기업 내부 문서를 클라우드 LLM에 보내면 보안·컴플라이언스 리스크가 커집니다.",
  solution:
    "하이브리드 아키텍처: Query Planner(외부, 질문만) → Vector Search(로컬) → RAG Generator(로컬 Ollama).",
  highlights: [
    "내부 문서 외부 미전송",
    "FAISS + SentenceTransformers",
    "의도·출처 투명 표시",
  ],
  stack: ["Python", "Streamlit", "FAISS", "Ollama", "OpenAI API"],
  links: {
    github: "https://github.com/CarlosKim-1997/Secure-Hybrid-RAG-Enterprise-Assistant",
  },
  demo: {
    mode: "none",
    warning:
      "Streamlit Cloud 웹 데모 배포 예정. 프로덕션은 Step 3 로컬 Ollama, 웹 데모는 Step 3만 클라우드 LLM으로 체험합니다.",
  },
  media: {
    cover: "/media/projects/secure-hybrid-rag-enterprise-assistant/cover.webp",
    og: "/media/projects/secure-hybrid-rag-enterprise-assistant/og.webp",
    screenshots: [
      "/media/projects/secure-hybrid-rag-enterprise-assistant/screenshot-01.webp",
    ],
  },
  visibility: "public",
  featured: true,
  priority: 90,
  deploy: {
    enabled: false,
    branch: "main",
    hookEnvKey: "VERCEL_HOOK_SECURE_HYBRID_RAG",
  },
} satisfies ProjectMeta;

export default meta;
