import type { CSSProperties, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Card({ children, className = "", style }: CardProps) {
  return (
    <div className={`soft-card p-6 ${className}`} style={style}>
      {children}
    </div>
  );
}
