import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "status" | "kind" | "accent";
};

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  status: "bg-zinc-800/90 text-stone-300 border-zinc-700",
  kind: "bg-stone-900/80 text-stone-300 border-stone-700/60",
  accent: "bg-lab-accent-muted text-stone-200 border-lab-accent/30",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
