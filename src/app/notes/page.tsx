import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "노트",
  "기술 노트, 글, 회고가 모일 예정인 공간입니다.",
);

export default function NotesPage() {
  return (
    <Container className="py-12 sm:py-16">
      <p className="mb-3 font-mono text-sm uppercase tracking-widest text-zinc-500">
        준비 중
      </p>
      <h1 className="mb-4 text-3xl font-bold text-zinc-50">노트</h1>
      <p className="max-w-xl text-zinc-400">
        긴 글과 회고는 이곳에 둘 예정입니다. 프로젝트와 같은 파일 기반
        구조로 확장할 수 있습니다.
      </p>
    </Container>
  );
}
