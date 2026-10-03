import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-white/10 bg-zinc-900/40 p-5 ${
        hover
          ? "transition hover:border-stone-500/35 hover:bg-zinc-900/65"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
