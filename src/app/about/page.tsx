import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "소개",
  "Carlos Lab — 개인 프로젝트 모음.",
);

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-cyan-400">
          소개
        </p>
        <h1 className="mb-4 text-3xl font-bold text-zinc-50 sm:text-4xl">
          소개
        </h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          여러 repo에 흩어져 있던 프로젝트를 한곳에 모았습니다. 설명과 데모를
          같이 두고, 되는 것은 브라우저에서 바로 실행합니다.
        </p>
      </header>

      <div className="max-w-2xl space-y-6 text-zinc-400">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-200">구조</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>프로젝트마다 meta.ts + MDX로 정리</li>
            <li>데모는 iframe·영상·임베드로 분리</li>
            <li>라이브 데모가 없으면 GitHub·영상으로 대체</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-zinc-200">시작하기</h2>
          <p>
            <Link href="/projects" className="text-cyan-400 hover:text-cyan-300">
              프로젝트
            </Link>
            목록에서 데모가 있는 것부터 보면 됩니다.
          </p>
        </section>
      </div>
    </Container>
  );
}
