'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Blob from '@/components/ui/Blob';

const slides = [
  { src: '/images/home/home_section1.webp',      pos: '50% 70%' }, // faces lower-center, tilted portrait
  { src: '/images/home/home_section1_2.webp',    pos: '50% 55%' }, // close-up face, fills frame
  { src: '/images/home/home_section1_3.webp',    pos: '45% 35%' }, // faces upper-left — pull up
  { src: '/images/home/home_section1_alt1.webp', pos: '55% 38%' }, // Bubby upper-right, Amira lower-left
  { src: '/images/home/home_section1_alt2.webp', pos: '50% 40%' }, // both faces upper-center
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt="Bubby smushing Amira's face"
            fill
            className="object-cover"
            style={{ objectPosition: slide.pos }}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Brand color overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-coral)]/10 via-transparent to-black/50 pointer-events-none" />

      {/* Blobs */}
      <Blob id="hero-r" variant={1} fill="var(--color-coral)"
        style={{ width: 260, height: 260, top: 32, right: 48, opacity: 0.3 }}
      />
      <Blob id="hero-l" variant={3} fill="var(--color-lavender)"
        style={{ width: 200, height: 200, top: '30%', left: '3%', opacity: 0.25 }}
        className="blob-slow"
      />

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === current ? 'white' : 'rgba(255,255,255,0.4)' }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 page-shell pb-10 pt-0 z-10">
        <p className="text-xs uppercase tracking-[0.18em] text-white/70 mb-2">
          Bubby&apos;s Health &amp; Wellness Practice
        </p>
        <h1 className="font-display text-4xl font-light leading-snug text-white md:text-5xl">
          Accepting new clients.<br />He will decide if you qualify.
        </h1>
      </div>
    </section>
  );
}
