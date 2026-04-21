'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

type Props = {
  /** Drop hero.webm and hero.mp4 into /public/videos/ to activate */
  fallbackSrc?: string;
};

export default function HeroVideo({ fallbackSrc = '/images/home/home_section1.webp' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure autoplay fires even if browser paused it
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[50%_75%]"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Fallback image shown while video loads or if unsupported */}
      <Image
        src={fallbackSrc}
        alt="Bubby's Health & Wellness Practice"
        fill
        className="object-cover object-[50%_75%] -z-10"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

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
