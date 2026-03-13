import Link from "next/link";
import Card from "@/components/ui/Card";

const offerings = [
  {
    name: "The Wall Brush",
    detail: "Bubby's actual wall brush. The one that started this.",
    href: "/product/wall-brush",
    status: "available",
  },
  {
    name: "The Bubby Blanket",
    detail: "Soft. He approves. That's the whole review.",
    href: "/product/bubby-blanket",
    status: "available",
  },
  {
    name: "The Sticker Sheet",
    detail: "Artist being sourced. Worth the wait.",
    href: "/product/sticker-sheet",
    status: "coming-soon",
  },
  {
    name: "The Bubby Tee",
    detail: "100% cotton. Made for you when you order. Bubby on it.",
    href: "/product/bubby-tee",
    status: "available",
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
                <div className="flex items-center gap-3">
                  <p className="font-display text-2xl">{item.name}</p>
                  {item.status === "coming-soon" && (
                    <span className="rounded-full bg-[var(--color-peach)]/60 px-3 py-1 text-xs text-[var(--color-gray-500)]">
                      Coming soon
                    </span>
                  )}
                </div>
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
