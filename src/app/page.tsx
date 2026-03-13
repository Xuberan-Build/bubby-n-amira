import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

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
        className="blob-slow -left-24 top-20 h-72 w-72"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ffe5ec, #ffd6e2 60%, #fefefe 100%)",
        }}
      />
      <Blob
        className="blob-fast right-[-80px] top-[-40px] h-80 w-80"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #e5d9f2, #d5f4e6 60%, #fefefe 100%)",
        }}
      />

      {/* Hero */}
      <section className="page-shell section-pad-lg relative">
        <div className="fade-up space-y-4" style={{ animationDelay: "50ms" }}>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
            Bubby n Amira
          </p>
          <h1 className="font-display text-4xl leading-tight text-[var(--color-charcoal)] md:text-6xl">
            A cat. His person. Some stuff they like.
          </h1>
        </div>
      </section>

      {/* Bubby's Faves */}
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

      {/* Keep Up With Us */}
      <section className="page-shell section-pad">
        <div className="soft-card bg-[var(--color-yellow)]/70 p-10 md:p-14 perspective-slab">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="font-display text-2xl">Keep Up With Us</h3>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                We&apos;ll email you when something happens. Probably not that
                often.
              </p>
            </div>
            <form className="flex flex-wrap gap-3">
              <input
                type="email"
                placeholder="your email"
                className="flex-1 rounded-2xl border border-transparent bg-white/80 px-4 py-2.5 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-gray-500)] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-2xl bg-[var(--color-charcoal)] px-6 py-2.5 text-sm text-white transition hover:opacity-80"
              >
                Okay
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
