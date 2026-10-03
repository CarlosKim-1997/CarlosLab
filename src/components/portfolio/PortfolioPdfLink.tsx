import {
  PORTFOLIO_DOWNLOAD_FILENAME,
  PORTFOLIO_PDF_HREF,
} from "@/lib/portfolio/constants";

const linkClasses =
  "group inline-flex max-w-3xl flex-wrap items-baseline gap-x-2 text-violet-300 underline decoration-violet-400/70 underline-offset-[6px] transition hover:text-violet-200 hover:decoration-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";

type PortfolioPdfLinkProps = {
  /** Larger type for the home hero under the main headline. */
  variant?: "hero" | "inline";
  className?: string;
};

export function PortfolioPdfLink({
  variant = "inline",
  className = "",
}: PortfolioPdfLinkProps) {
  const sizeClasses =
    variant === "hero"
      ? "text-lg font-semibold sm:text-xl"
      : "text-base font-medium";

  return (
    <a
      href={PORTFOLIO_PDF_HREF}
      download={PORTFOLIO_DOWNLOAD_FILENAME}
      className={`${linkClasses} ${sizeClasses} ${className}`}
    >
      <span className="font-mono text-sm font-normal tracking-wide text-violet-400/90 group-hover:text-violet-300">
        Portfolio
      </span>
      <span>AI Problem Solving Portfolio — PDF 다운로드</span>
      <span
        className="text-violet-400/80 group-hover:text-violet-300"
        aria-hidden
      >
        ↓
      </span>
    </a>
  );
}
