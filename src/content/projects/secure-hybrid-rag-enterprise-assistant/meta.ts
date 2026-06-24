import type { ProjectMeta } from "@/lib/project/types";

const meta = {
  slug: "secure-hybrid-rag-enterprise-assistant",
  title: "Secure Hybrid RAG",
  subtitle: "내규 문서 검색 — 질문만 외부로, 검색·답변은 로컬.",
  status: "active",
  kind: "ai",
  year: 2026,
  summary:
    "금융사 내규 질의용 RAG. 질문 분석만 OpenAI, FAISS 검색과 답변 생성은 로컬 Ollama에서 처리합니다.",
  problem:
    "내부 문서 전체를 클라우드 LLM에 넘기면 보안 검토를 통과하기 어렵습니다.",
  solution:
    "3단계 파이프라인: 질문 분석 → 로컬 벡터 검색 → 로컬 LLM 답변. 문서 본문은 외부로 나가지 않습니다.",
  highlights: [
    "질문 텍스트만 외부 API 전송",
    "FAISS + SentenceTransformers",
    "검색 근거·의도를 UI에 표시",
  ],
  stack: ["Python", "Streamlit", "FAISS", "Ollama", "OpenAI API"],
  links: {
    github: "https://github.com/CarlosKim-1997/Secure-Hybrid-RAG-Enterprise-Assistant",
    demo: "https://secure-hybrid-rag-enterprise-assistant-w7zep4vfr7hjilmthw7a7n.streamlit.app/",
  },
  demoNote:
    "원래 설계는 Step 3 답변을 로컬 Ollama에서 생성합니다. 이 사이트의 웹 시연(Streamlit Cloud)에서는 Ollama를 띄울 수 없어 Step 3만 클라우드 LLM으로 대체합니다. Step 1·2(질문 분석, FAISS 검색)는 동일합니다.",
  demo: {
    mode: "iframe",
    url: "https://secure-hybrid-rag-enterprise-assistant-w7zep4vfr7hjilmthw7a7n.streamlit.app/",
    aspectRatio: "16/9",
    warning:
      "웹 시연 모드입니다. Streamlit Cloud 데모라 첫 로드·유휴 후 재접속 시 30초쯤 걸릴 수 있습니다.",
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
