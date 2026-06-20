import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="mb-2 font-mono text-sm text-cyan-400">404</p>
      <h1 className="mb-4 text-2xl font-bold text-zinc-100">페이지를 찾을 수 없습니다</h1>
      <p className="mb-8 max-w-md text-zinc-500">
        존재하지 않는 경로이거나, 프로젝트 slug가 잘못되었을 수 있습니다.
      </p>
      <div className="flex gap-3">
        <Button href="/projects">프로젝트 보기</Button>
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
          홈으로
        </Link>
      </div>
    </Container>
  );
}
