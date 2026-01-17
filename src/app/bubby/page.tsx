import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function BubbyPage() {
  const offerings = [
    {
      name: "Bubby's Practical Tee",
      detail: "Cotton. Neutral. The kind of thing that works.",
      href: "/product/bubbys-practical-tee",
    },
    {
      name: "Notebook of Mild Opinions",
      detail: "Lined pages, quiet cover, no promises.",
      href: "/product/notebook-of-mild-opinions",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Blob
        className="blob-slow left-[-60px] top-24 h-64 w-64"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ffe5ec, #ffdab9 65%, #fefefe 100%)",
        }}
      />
      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="fade-up space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Meet Bubby
            </p>
            <h1 className="font-display text-4xl md:text-5xl">
              Bubby keeps a list. You can borrow it.
            </h1>
            <p className="text-base text-[var(--color-gray-500)] md:text-lg">
              Bubby is precise, polite, and dry enough to keep a room calm. He
              prefers soft colors, practical shapes, and things that do not
              require instructions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/available">See what he&apos;s offering</Button>
              <Button href="/amira" variant="secondary">
                Visit Amira
              </Button>
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: "120ms" }}>
            <Card className="bg-[var(--color-peach)]/70 perspective-slab">
              <p className="font-display text-lg">Quick facts</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-gray-500)]">
                <li>Likes: warm tea, clean lines, early mornings.</li>
                <li>Dislikes: loud opinions, shiny things, chaos.</li>
                <li>Quirk: always has a backup pen.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <h2 className="font-display text-3xl">Things Bubby is offering</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {offerings.map((item) => (
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
