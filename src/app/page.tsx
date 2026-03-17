import Image from "next/image";
import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import WaitlistButton from "@/components/waitlist/WaitlistButton";

const favorites = [
  {
    name: "The Wall Brush",
    detail: "Bubby's actual wall brush. The one that started this.",
    href: "/product/wall-brush",
  },
  {
    name: "The Bubby Blanket",
    detail: "Soft. He approves. That's the whole review.",
    href: "/product/bubby-blanket",
  },
  {
    name: "The Bubby Tee",
    detail: "100% cotton. Made for you when you order. Bubby on it.",
    href: "/product/bubby-tee",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Blob
        className="blob-slow -left-24 top-20 h-[360px] w-[360px]"
        fill="#FF9AA2"
      />
      <Blob
        className="blob-fast right-[-80px] top-[-40px] h-80 w-80"
        fill="#e5d9f2"
      />

      {/* Hero */}
      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="fade-up space-y-4" style={{ animationDelay: "50ms" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Bubby n Amira
            </p>
            <h1 className="font-display text-4xl leading-tight text-[var(--color-charcoal)] md:text-6xl">
              A cat. His person. Some stuff they like.
            </h1>
          </div>
          <div className="fade-up relative aspect-[4/3] overflow-hidden rounded-3xl" style={{ animationDelay: "150ms" }}>
            <Image
              src="/images/home/home_section1.webp"
              alt="Bubby and Amira"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Bubby's Faves */}
      <div className="relative overflow-hidden">
      <Blob className="blob-slow right-[-50px] top-[-30px] h-48 w-48" fill="#d5f4e6" />
      <section className="page-shell section-pad">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl">Bubby&apos;s Faves</h2>
            <p className="mt-2 text-sm text-[var(--color-gray-500)]">
              He picked these. We&apos;re not sure how.
            </p>
          </div>
          <Link
            href="/available"
            className="hidden text-sm link-underline md:inline-flex"
          >
            See everything
          </Link>
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {favorites.map((item, index) => (
            <Card
              key={item.name}
              className="fade-up bg-[var(--color-gray-100)]"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <p className="font-display text-lg">{item.name}</p>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                {item.detail}
              </p>
              <Link
                href={item.href}
                className="mt-5 inline-flex text-sm link-underline"
              >
                Details
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-6 md:hidden">
          <Link href="/available" className="text-sm link-underline">
            See everything
          </Link>
        </div>
      </section>
      </div>

      {/* Amira — Bubby's Obsession */}
      <section className="page-shell section-pad">
        <div className="soft-card bg-[var(--color-lavender)]/70 p-10 md:p-14 perspective-slab-right">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl">Amira</h2>
              <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                Bubby&apos;s obsession. She didn&apos;t ask for this.
              </p>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-gray-500)]">
                Wherever Amira goes, Bubby follows. Whatever Amira does, Bubby
                judges. This is their dynamic. It works, somehow.
              </p>
            </div>
            <div>
              <Link href="/amira" className="text-sm link-underline">
                Meet Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <div className="relative overflow-hidden">
      <Blob className="blob-slow -left-20 top-[-20px] h-56 w-56" fill="#ffdab9" />
      <section className="page-shell section-pad">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">The Story</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-gray-500)]">
              Bubby is a cat. Amira is the person he won&apos;t leave alone. At
              some point we started putting things on the internet. Here we are.
            </p>
          </div>
          <div>
            <p className="font-display text-lg">How to shop our favorites</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-gray-500)]">
              Find something Bubby likes. Decide if you also like it. Get it if
              you want. That&apos;s really it.
            </p>
            <div className="mt-6">
              <Button href="/available">See What He Likes</Button>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Keep Up With Us */}
      <section className="page-shell section-pad">
        <div className="soft-card bg-[var(--color-yellow)]/70 p-10 md:p-14 perspective-slab">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="font-display text-2xl">Keep Up With Us</h3>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                bubby will notify you when he feels like it.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className="text-sm text-[var(--color-gray-500)]">
                join bubby&apos;s waitlist for a massage .. or something
              </p>
              <WaitlistButton source="homepage-cta">
                sure i like you, add me
              </WaitlistButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
