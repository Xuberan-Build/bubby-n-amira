"use client";

import { useState } from "react";
import Image from "next/image";

export type ProductGalleryProps = {
  images: { url: string; altText: string | null }[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return <div className="aspect-[3/4] bg-[var(--color-gray-100)]" />;
  }

  const current = images[selected] ?? images[0];

  return (
    <div className="bg-[var(--color-white)] lg:pt-12">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={current.url}
          alt={current.altText ?? title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-px bg-[var(--color-gray-100)] border-t border-[var(--color-gray-100)]">
          {images.map((img, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                aria-current={isSelected}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square overflow-hidden ${
                  isSelected
                    ? "ring-2 ring-[var(--color-coral)] ring-inset"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? title}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
