import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "소개",
  "이 랩이 존재하는 이유와 프로젝트 구조를 설명합니다.",
);

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-cyan-400">
          소개
        </p>
        <h1 className="mb-4 text-3xl font-bold text-zinc-50 sm:text-4xl">
          랜딩 페이지가 아니라, 랩입니다
        </h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          도구, AI 워크플로, 모바일 앱, RAG 실험 등 다양한 빌드를 만듭니다.
          이 사이트는 흩어진 README 대신, 구조화되고 체험 가능한 형태로
          프로젝트를 모아 둔 공간입니다.
        </p>
      </header>

      <div className="max-w-2xl space-y-6 text-zinc-400">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-200">원칙</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>콘텐츠는 UI 안에 묻히지 않는다.</li>
            <li>데모 런타임은 포트폴리오 런타임과 분리한다.</li>
            <li>모든 프로젝트는 metadata + MDX로 표현한다.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-200">여기서 볼 수 있는 것</h2>
          <p>
            가능하면 라이브 데모, 어려우면 영상·GitHub 링크, 더 깊게는 기술
            노트.{" "}
            <Link href="/projects" className="text-cyan-400 hover:text-cyan-300">
              프로젝트
            </Link>
            부터 먼저 체험해 보세요.
          </p>
        </section>
      </div>
    </Container>
  );
}
