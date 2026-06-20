import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-sm ${
        hover
          ? "transition hover:border-cyan-500/40 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-cyan-950/20"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
