import type { CSSProperties } from "react";

type BlobProps = {
  className?: string;
  style?: CSSProperties;
};

export default function Blob({ className = "", style }: BlobProps) {
  return <div className={`blob ${className}`} style={style} aria-hidden />;
}
