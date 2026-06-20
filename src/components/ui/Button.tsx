import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-500 text-zinc-950 hover:bg-cyan-400 border border-cyan-400/50",
  secondary:
    "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
  ghost: "bg-transparent text-zinc-300 hover:bg-zinc-800/60 border border-transparent",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500";

export function Button({
  children,
  variant = "primary",
  href,
  external,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
