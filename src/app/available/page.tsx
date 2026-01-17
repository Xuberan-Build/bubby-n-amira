import Link from "next/link";
import Card from "@/components/ui/Card";

const offerings = [
  {
    name: "Bubby's Practical Tee",
    detail: "Cotton. Neutral. The kind of thing that works.",
    character: "Bubby",
    href: "/product/bubbys-practical-tee",
  },
  {
    name: "Amira's Tote",
    detail: "Canvas, 15 x 16, holds groceries and opinions.",
    character: "Amira",
    href: "/product/amiras-tote",
  },
  {
    name: "The Quiet Mug",
    detail: "A mug that knows when to stop talking.",
    character: "Both",
    href: "/product/quiet-mug",
  },
];

export default function AvailablePage() {
  return (
    <div className="page-shell section-pad-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
            What&apos;s available
          </p>
          <h1 className="font-display text-4xl md:text-5xl">
            Current offerings
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
          <span className="rounded-full border border-[var(--color-gray-500)] px-4 py-2">
            Bubby
          </span>
          <span className="rounded-full border border-[var(--color-gray-500)] px-4 py-2">
            Amira
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-10">
        {offerings.map((item) => (
          <Card
            key={item.name}
            className="bg-[var(--color-gray-100)] p-9 perspective-slab"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
                  {item.character}
                </p>
                <p className="font-display text-2xl">{item.name}</p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  {item.detail}
                </p>
              </div>
              <Link href={item.href} className="link-underline text-sm">
                See details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
