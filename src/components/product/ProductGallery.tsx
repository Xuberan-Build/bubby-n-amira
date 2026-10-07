"use client";

import { useState } from "react";
import Image from "next/image";
import { useProductSelection } from "@/components/product/ProductSelection";

export type GalleryImage = {
  url: string;
  altText: string | null;
  // Variant option value this image depicts (e.g. a Color). Selecting that
  // value in the picker jumps here; clicking the image selects the value.
  optionValue?: string;
};

export type ProductGalleryProps = {
  images: GalleryImage[];
  title: string;
  // Option name that optionValue refers to, e.g. "Color".
  linkedOption?: string;
  square?: boolean;
};

export default function ProductGallery({
  images,
  title,
  linkedOption,
  square,
}: ProductGalleryProps) {
  const { selected: options, setOption } = useProductSelection();
  const linkedValue = linkedOption ? options[linkedOption] : undefined;
  const [selected, setSelected] = useState(() => {
    const i = images.findIndex((img) => img.optionValue && img.optionValue === linkedValue);
    return i >= 0 ? i : 0;
  });

  // Follow the picker: when the chosen value changes, show its first image
  // unless the current image already depicts it.
  const [prevLinkedValue, setPrevLinkedValue] = useState(linkedValue);
  if (linkedValue !== prevLinkedValue) {
    setPrevLinkedValue(linkedValue);
    if (images[selected]?.optionValue !== linkedValue) {
      const i = images.findIndex((img) => img.optionValue === linkedValue);
      if (i >= 0) setSelected(i);
    }
  }

  const aspect = square ? "aspect-square" : "aspect-[3/4]";

  if (images.length === 0) {
    return <div className={`${aspect} bg-[var(--color-gray-100)]`} />;
  }

  const current = images[selected] ?? images[0];

  function select(i: number) {
    setSelected(i);
    const value = images[i]?.optionValue;
    if (linkedOption && value) setOption(linkedOption, value);
  }

  return (
    <div className="bg-[var(--color-white)] lg:pt-12">
      <div className={`relative ${aspect} w-full overflow-hidden`}>
        <Image
          src={current.url}
          alt={current.altText ?? title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div
          className="grid gap-px bg-[var(--color-gray-100)] border-t border-[var(--color-gray-100)]"
          style={{ gridTemplateColumns: `repeat(${images.length <= 6 ? images.length : 5}, minmax(0, 1fr))` }}
        >
          {images.map((img, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => select(i)}
                aria-current={isSelected}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square overflow-hidden bg-[var(--color-white)] ${
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
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
