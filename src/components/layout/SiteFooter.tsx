import Link from "next/link";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          읽기만 하는 포트폴리오가 아니라, 직접 체험하는 프로젝트 랩입니다.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/projects" className="text-zinc-400 hover:text-zinc-200">
            프로젝트
          </Link>
          <Link href="/about" className="text-zinc-400 hover:text-zinc-200">
            소개
          </Link>
          <a
            href="https://github.com/CarlosKim-1997"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-200"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
