import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "소개",
  "Carlos Lab — 만든 도구와 실험을 모아 둔 작업실.",
);

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium text-stone-500">소개</p>
        <h1 className="mb-4 text-3xl font-bold text-stone-50 sm:text-4xl">
          Carlos Lab
        </h1>
        <p className="text-lg leading-relaxed text-stone-400">
          여러 저장소에 흩어져 있던 결과물을 한곳에 모았습니다. 설명과 실행
          가능한 데모를 같이 두고, 되는 것은 브라우저에서 바로 확인합니다.
        </p>
      </header>

      <div className="max-w-2xl space-y-6 text-stone-400">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-stone-200">구조</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>프로젝트마다 meta.ts + MDX로 정리</li>
            <li>데모는 iframe·영상·임베드로 분리</li>
            <li>라이브 데모가 없으면 GitHub·영상으로 대체</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-stone-200">
            어디부터 볼까
          </h2>
          <p>
            <Link
              href="/projects"
              className="text-lab-accent underline decoration-lab-accent/35 underline-offset-2 hover:text-lab-accent-hover"
            >
              프로젝트
            </Link>
            목록에서 데모가 있는 것부터 보면 됩니다. 판단과 케이스 서사는 홈의
            PDF 프리뷰를 참고하면 됩니다.
          </p>
        </section>
      </div>
    </Container>
  );
}
