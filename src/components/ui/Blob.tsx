import type { CSSProperties } from "react";

type Circle = { cx: number; cy: number; r: number };

type BlobVariant = {
  circles: Circle[];
  viewBox: string;
};

// Each variant is 3-4 overlapping circles that merge via goo filter
// into a smooth multi-lobe organic shape
const variants: Record<number, BlobVariant> = {
  // Three lobes — triangular cluster
  1: {
    viewBox: "-20 -20 310 300",
    circles: [
      { cx: 100, cy: 75,  r: 78 },
      { cx: 198, cy: 100, r: 68 },
      { cx: 148, cy: 188, r: 72 },
    ],
  },
  // Four lobes — soft square cluster
  2: {
    viewBox: "-20 -20 310 310",
    circles: [
      { cx: 88,  cy: 88,  r: 72 },
      { cx: 195, cy: 82,  r: 65 },
      { cx: 82,  cy: 192, r: 65 },
      { cx: 198, cy: 196, r: 70 },
    ],
  },
  // Two large lobes — horizontal pair
  3: {
    viewBox: "-20 -20 330 250",
    circles: [
      { cx: 88,  cy: 118, r: 85 },
      { cx: 215, cy: 112, r: 80 },
    ],
  },
  // Three lobes — horizontal chain
  4: {
    viewBox: "-20 -20 370 240",
    circles: [
      { cx: 75,  cy: 115, r: 70 },
      { cx: 180, cy: 100, r: 80 },
      { cx: 278, cy: 118, r: 66 },
    ],
  },
};

type BlobProps = {
  id: string;
  variant?: 1 | 2 | 3 | 4;
  fill?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Blob({ id, variant = 1, fill = "#FF9AA2", className = "", style }: BlobProps) {
  const v = variants[variant];
  const filterId = `goo-${id}`;

  return (
    <svg
      viewBox={v.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`blob ${className}`}
      style={style}
      aria-hidden
    >
      <defs>
        <filter
          id={filterId}
          x="-30%" y="-30%" width="160%" height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="goo"
          />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {v.circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={fill} />
        ))}
      </g>
    </svg>
  );
}
