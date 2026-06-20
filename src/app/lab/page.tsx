import { Container } from "@/components/layout/Container";
import { DeploySyncPanel } from "@/components/lab/DeploySyncPanel";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata(
  "랩",
  "데모 pre-warm 검사 및 GitHub 연동 배포 트리거.",
);

export default function LabPage() {
  return (
    <Container className="py-12 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-widest text-emerald-400">
          랩 / 운영
        </p>
        <h1 className="mb-4 text-3xl font-bold text-zinc-50">랩</h1>
        <p className="text-zinc-400">
          프로젝트 데모 캐시 상태를 수동으로 검사하고, 필요하면 deploy hook으로
          백그라운드 배포를 시작합니다.
        </p>
      </header>
      <DeploySyncPanel />
    </Container>
  );
}
