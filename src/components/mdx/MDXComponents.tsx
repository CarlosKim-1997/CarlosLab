import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 text-2xl font-semibold text-zinc-100 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold text-zinc-200">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-zinc-400">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-zinc-400">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-zinc-400">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:text-cyan-300"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:text-cyan-300"
      >
        {children}
      </Link>
    );
  },
  code: ({ children }) => (
    <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-cyan-300">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg border border-white/10 bg-zinc-950 p-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-4 border-cyan-500/50 pl-4 italic text-zinc-400">
      {children}
    </blockquote>
  ),
};
