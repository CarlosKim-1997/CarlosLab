/** Public URL path (ASCII) for the portfolio PDF in `public/downloads/`. */
export const PORTFOLIO_PDF_HREF = "/downloads/kim-sung-ha-portfolio.pdf";

/** Suggested filename when the visitor saves the file. */
export const PORTFOLIO_DOWNLOAD_FILENAME = "김성하_포트폴리오.pdf";

export const PORTFOLIO_STAGES = [
  { step: "01", title: "Problem", detail: "문제·병목 정의" },
  { step: "02", title: "Hypothesis", detail: "직관 기반 가설" },
  { step: "03", title: "AI Role", detail: "해석·레퍼런스·제안" },
  { step: "04", title: "Evaluation", detail: "사실 기반 검증" },
  { step: "05", title: "Failure Check", detail: "정의·가설·조사 점검" },
  { step: "06", title: "Boundary Set", detail: "결론 경계 확정" },
  { step: "07", title: "Better Next Time", detail: "반복·개선 가시화" },
] as const;

export const PORTFOLIO_CASES = [
  {
    id: "01",
    title: "ReDiscovery",
    summary: "의미 기반 판정(Judge)이 있는 이론 재발견 데일리 웹게임",
  },
  {
    id: "02",
    title: "Hermeneus",
    summary: "손실 없는 대화 맥락 전달",
  },
  {
    id: "03",
    title: "Repository-Governance",
    summary: "작업 주체가 바뀌어도 일관된 repo 관리",
  },
  {
    id: "04",
    title: "Robot Troubleshooting",
    summary: "재현 가능한 원인 찾기 (Physical AI)",
  },
] as const;
