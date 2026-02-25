import Link from "next/link";
import Card from "@/components/ui/Card";

const offerings = [
  {
    name: "The Shirt We Made",
    detail: "A shirt. 100% cotton. Fits like a shirt should.",
    href: "/product/bubbys-practical-tee",
  },
  {
    name: "That Tote",
    detail: "Canvas. Fits groceries or whatever else you carry around. Bubby's face is on it.",
    href: "/product/amiras-tote",
  },
  {
    name: "The Quiet Mug",
    detail: "Ceramic. Holds coffee. That's the whole pitch.",
    href: "/product/quiet-mug",
  },
  {
    name: "The Notebook",
    detail: "Lined pages. Soft cover. 120 pages.",
    href: "/product/notebook-of-mild-opinions",
  },
  {
    name: "The Sticker Sheet",
    detail: "Matte finish. Weather resistant. Peels cleanly.",
    href: "/product/lavender-sticker-sheet",
  },
];

export default function AvailablePage() {
  return (
    <div className="page-shell section-pad-lg">
      <div>
        <h1 className="font-display text-4xl md:text-5xl">
          Shop Our Favorites
        </h1>
        <p className="mt-3 text-sm text-[var(--color-gray-500)]">
          Bubby approves of all of these. For whatever that&apos;s worth.
        </p>
      </div>

      <div className="mt-12 grid gap-10">
        {offerings.map((item) => (
          <Card
            key={item.name}
            className="bg-[var(--color-gray-100)] p-9 perspective-slab"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-2xl">{item.name}</p>
                <p className="mt-3 text-sm text-[var(--color-gray-500)]">
                  {item.detail}
                </p>
              </div>
              <Link href={item.href} className="link-underline text-sm shrink-0">
                See details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
