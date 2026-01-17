import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  const offerings = [
    {
      name: "Bubby's Practical Tee",
      detail: "Cotton. Neutral. Just enough.",
      href: "/product/bubbys-practical-tee",
    },
    {
      name: "Amira's Tote (The One That Replaced The Other One)",
      detail: "Canvas with a memory for receipts.",
      href: "/product/amiras-tote",
    },
    {
      name: "The Quiet Mug",
      detail: "Holds coffee. Keeps secrets.",
      href: "/product/quiet-mug",
    },
  ];

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
      <section className="page-shell section-pad-lg relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="fade-up space-y-6" style={{ animationDelay: "50ms" }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Bubby n Amira
            </p>
            <h1 className="font-display text-4xl leading-tight text-[var(--color-charcoal)] md:text-6xl">
              Meet Bubby and Amira. They have stuff.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-[var(--color-gray-500)] md:text-lg">
              Two characters. Occasional products. Mostly just existing in their
              own little world. You can hang out and, if you want, take
              something home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/bubby">Meet the characters</Button>
              <Button href="/available" variant="secondary">
                What&apos;s around
              </Button>
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: "150ms" }}>
            <div className="grid gap-6">
              <div className="soft-card bg-[var(--color-peach)]/70 p-7 tilt-left">
                <p className="font-display text-lg">Bubby says it&apos;s fine.</p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  Observant, dry, and somehow always holding a list.
                </p>
              </div>
              <div className="soft-card bg-[var(--color-mint)]/80 p-7 tilt-right">
                <p className="font-display text-lg">Amira is collecting things.</p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  Calm energy, quick wit, likes what she likes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-10 md:grid-cols-2">
          <Card className="fade-up bg-[var(--color-pink)]/60 perspective-slab">
            <h2 className="font-display text-2xl">Bubby</h2>
            <p className="mt-3 text-sm text-[var(--color-gray-500)]">
              Keeps a running commentary about everything, but it never sounds
              like commentary. Likes clean lines, warm drinks, and finding the
              exact right phrase.
            </p>
            <Link href="/bubby" className="mt-5 inline-flex text-sm link-underline">
              See Bubby&apos;s page
            </Link>
          </Card>
          <Card className="fade-up bg-[var(--color-lavender)]/70 perspective-slab-right">
            <h2 className="font-display text-2xl">Amira</h2>
            <p className="mt-3 text-sm text-[var(--color-gray-500)]">
              Moves quietly but leaves a trail of opinions. Collects objects
              with stories and deletes the ones without.
            </p>
            <Link href="/amira" className="mt-5 inline-flex text-sm link-underline">
              See Amira&apos;s page
            </Link>
          </Card>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              What&apos;s around lately
            </p>
            <h2 className="font-display text-3xl">Current offerings</h2>
          </div>
          <Link href="/available" className="hidden text-sm link-underline md:inline-flex">
            All offerings
          </Link>
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {offerings.map((item, index) => (
            <Card
              key={item.name}
              className="fade-up bg-[var(--color-gray-100)]"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <p className="font-display text-lg">{item.name}</p>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                {item.detail}
              </p>
              <Link href={item.href} className="mt-5 inline-flex text-sm link-underline">
                Details
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="soft-card bg-[var(--color-yellow)]/70 p-10 md:p-14 perspective-slab">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="font-display text-2xl">Quiet updates</h3>
              <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                Sometimes there&apos;s a new thing. Sometimes there&apos;s a new
                story. If you want to hear about it, we&apos;ll keep it short.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" href="/available">
                See what&apos;s new
              </Button>
              <Button variant="ghost" href="/contact">
                Say hi
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
