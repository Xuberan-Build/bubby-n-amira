import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AmiraPage() {
  const offerings = [
    {
      name: "Amira's Tote",
      detail: "Canvas, 15 x 16, knows how to hold secrets.",
      href: "/product/amiras-tote",
    },
    {
      name: "Lavender Sticker Sheet",
      detail: "Low commitment, high clarity.",
      href: "/product/lavender-sticker-sheet",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Blob
        className="blob-slow right-[-60px] top-20 h-72 w-72"
        style={{
          background:
            "radial-gradient(circle at 60% 30%, #e5d9f2, #d5f4e6 60%, #fefefe 100%)",
        }}
      />
      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="fade-up space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
              Meet Amira
            </p>
            <h1 className="font-display text-4xl md:text-5xl">
              Amira collects stories. She lets you take the good ones.
            </h1>
            <p className="text-base text-[var(--color-gray-500)] md:text-lg">
              Amira is calm, observational, and quietly funny. She likes the
              kind of things that become useful over time and the kind of
              jokes you can say without smiling.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/available">See what she&apos;s offering</Button>
              <Button href="/bubby" variant="secondary">
                Visit Bubby
              </Button>
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: "120ms" }}>
            <Card className="bg-[var(--color-mint)]/80 perspective-slab-right">
              <p className="font-display text-lg">Quick facts</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-gray-500)]">
                <li>Likes: calm playlists, soft light, good storage.</li>
                <li>Dislikes: rush, clutter, loud bragging.</li>
                <li>Quirk: keeps receipts for sentimental reasons.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <h2 className="font-display text-3xl">Amira&apos;s current selections</h2>
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
