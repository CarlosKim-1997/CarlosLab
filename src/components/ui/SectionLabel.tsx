import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  as?: "h2" | "p";
};

export function SectionLabel({
  children,
  className = "",
  as: Tag = "h2",
}: SectionLabelProps) {
  return (
    <Tag
      className={`text-base font-semibold tracking-tight text-stone-300 ${className}`}
    >
      {children}
    </Tag>
  );
}
