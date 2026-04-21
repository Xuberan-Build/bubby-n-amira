'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Slide = { src: string; alt: string };

type Props = {
  slides: Slide[];
  interval?: number;
  sizes?: string;
  className?: string;
};

export default function PhotoCarousel({ slides, interval = 3500, sizes = '100vw', className = '' }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {slides.map((slide, i) => (
        <div
          key={slide.src + i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image src={slide.src} alt={slide.alt} fill className="object-cover" sizes={sizes} />
        </div>
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === current ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.2)' }}
          />
        ))}
      </div>
    </div>
  );
}
