import Image from "next/image";
import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const faves = [
  {
    name: "Bubby's Practical Tee",
    detail: "A shirt. 100% cotton. Fits like a shirt should.",
    href: "/product/bubbys-practical-tee",
  },
  {
    name: "The Quiet Mug",
    detail: "Ceramic. Holds coffee. That's the whole pitch.",
    href: "/product/quiet-mug",
  },
];

export default function BubbyPage() {
  return (
    <div className="relative overflow-hidden">
      <Blob className="blob-slow left-[-60px] top-24 h-64 w-64" fill="#ffdab9" />

      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="fade-up space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Meet Bubby
            </p>
            <h1 className="font-display text-4xl md:text-5xl">
              He&apos;s a cat. He has opinions.
            </h1>
            <p className="text-base text-[var(--color-gray-500)] md:text-lg">
              Bubby is a cat with a rich inner life and an esthetician practice
              that nobody asked about. He is deeply committed to Amira and
              completely indifferent to everyone else. He has favorites. He will
              let you know.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/available">See his picks</Button>
              <Button href="/amira" variant="secondary">
                Meet Us
              </Button>
            </div>
          </div>
          <div className="fade-up relative aspect-square overflow-hidden rounded-3xl" style={{ animationDelay: "120ms" }}>
            <Image
              src="/images/meet-bubby/meetbubby_section1.webp"
              alt="Bubby the cat"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { src: "/images/meet-bubby/meetbubby_section1_1.webp", alt: "Bubby" },
            { src: "/images/meet-bubby/meetbubby_section1_2.webp", alt: "Bubby" },
            { src: "/images/meet-bubby/meetbubby_section1_3.webp", alt: "Bubby" },
            { src: "/images/meet-bubby/meetbubby_section1_4.webp", alt: "Bubby" },
          ].map((img) => (
            <div key={img.src} className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell section-pad">
        <h2 className="font-display text-3xl">Bubby&apos;s Current Faves</h2>
        <p className="mt-2 text-sm text-[var(--color-gray-500)]">
          He curated this list himself. Technically.
        </p>
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {faves.map((item) => (
            <Card key={item.name} className="bg-[var(--color-gray-100)]">
              <p className="font-display text-lg">{item.name}</p>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                {item.detail}
              </p>
              <Link
                href={item.href}
                className="mt-5 inline-flex text-sm link-underline"
              >
                See details
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
