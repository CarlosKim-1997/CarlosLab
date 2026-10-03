import Link from "next/link";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/projects", label: "프로젝트" },
  { href: "/ideas", label: "아이디어" },
  { href: "/lab", label: "랩" },
  { href: "/notes", label: "노트" },
  { href: "/about", label: "소개" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0b0a]/92 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-stone-200 transition hover:text-stone-50"
        >
          Carlos Lab
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-stone-500 transition hover:text-stone-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-3 md:hidden">
          <Link
            href="/projects"
            className="text-sm text-stone-500 transition hover:text-stone-200"
          >
            프로젝트
          </Link>
          <Link
            href="/ideas"
            className="text-sm text-stone-500 transition hover:text-stone-200"
          >
            아이디어
          </Link>
          <Link
            href="/about"
            className="text-sm text-stone-500 transition hover:text-stone-200"
          >
            소개
          </Link>
        </nav>
      </Container>
    </header>
  );
}
