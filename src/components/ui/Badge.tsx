import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "status" | "kind" | "accent";
};

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  status: "bg-violet-950/60 text-violet-300 border-violet-800/50",
  kind: "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
  accent: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
