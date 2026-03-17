import type { CSSProperties } from "react";

type BlobProps = {
  className?: string;
  style?: CSSProperties;
  fill?: string;
};

export default function Blob({ className = "", style, fill = "#FF9AA2" }: BlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`blob ${className}`}
      style={style}
      aria-hidden
    >
      <path
        fill={fill}
        d="M28.5,-46C36.3,-33.7,41.3,-24.4,46.5,-13.9C51.6,-3.3,56.8,8.4,58.6,24.1C60.5,39.8,58.9,59.4,48.6,65.6C38.3,71.8,19.1,64.5,0.7,63.6C-17.8,62.7,-35.7,68.1,-41.9,60.6C-48.2,53.1,-42.8,32.7,-49.6,15.3C-56.3,-2.1,-75.1,-16.3,-78,-30.9C-80.9,-45.5,-67.9,-60.5,-52.2,-70.3C-36.6,-80.2,-18.3,-84.8,-3.9,-79.3C10.4,-73.9,20.8,-58.4,28.5,-46Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
