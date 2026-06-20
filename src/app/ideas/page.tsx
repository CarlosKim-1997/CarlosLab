import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "아이디어",
  "초기 컨셉과 반쯤 만든 실험이 모일 예정인 공간입니다.",
);

export default function IdeasPage() {
  return (
    <Container className="py-12 sm:py-16">
      <p className="mb-3 font-mono text-sm uppercase tracking-widest text-violet-400">
        준비 중
      </p>
      <h1 className="mb-4 text-3xl font-bold text-zinc-50">아이디어</h1>
      <p className="max-w-xl text-zinc-400">
        아직 프로젝트가 되기 전의 아이디어와 스케치가 이곳에 모일 예정입니다.
        라우트와 구조만 미리 확보해 두었습니다.
      </p>
    </Container>
  );
}
