import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
};

const baseClasses =
  "soft-button inline-flex items-center justify-center gap-2 px-6 py-3 text-sm transition";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-coral)] text-[var(--color-white)] shadow-sm",
  secondary:
    "border-2 border-[var(--color-coral)] text-[var(--color-coral)] bg-transparent",
  ghost: "text-[var(--color-soft-purple)]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    const isMail = href.startsWith("mailto:");

    if (isExternal || isMail) {
      return (
        <a
          href={href}
          className={classes}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
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
    <button className={classes} type="button">
      {children}
    </button>
  );
}
