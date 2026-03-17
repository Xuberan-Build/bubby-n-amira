import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import WaitlistButton from "@/components/waitlist/WaitlistButton";

const offerings = [
  {
    name: "The Wall Brush",
    detail: "Bubby's actual wall brush. The one that started this.",
    href: "/product/wall-brush",
    status: "available",
    image: "/images/products/thewallbrush1.webp",
  },
  {
    name: "The Bubby Blanket",
    detail: "Soft. He approves. That's the whole review.",
    href: "/product/bubby-blanket",
    status: "available",
    image: "/images/products/bubbyblanket1.webp",
  },
  {
    name: "The Sticker Sheet",
    detail: "Artist being sourced. Worth the wait.",
    href: "/product/sticker-sheet",
    status: "coming-soon",
    image: null,
  },
  {
    name: "The Bubby Tee",
    detail: "100% cotton. Made for you when you order. Bubby on it.",
    href: "/product/bubby-tee",
    status: "available",
    image: "/images/products/bubbytshirt.webp",
  },
];

export default function AvailablePage() {
  return (
    <div className="page-shell section-pad-lg">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <h1 className="font-display text-4xl md:text-5xl">
            Shop Our Favorites
          </h1>
          <p className="mt-3 text-sm text-[var(--color-gray-500)]">
            Bubby approves of all of these. For whatever that&apos;s worth.
          </p>
        </div>
        <div className="relative aspect-[16/7] overflow-hidden rounded-3xl">
          <Image
            src="/images/shop/shopall_section1.webp"
            alt="Shop all — Bubby n Amira"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-10">
        {offerings.map((item) => (
          <Card
            key={item.name}
            className="bg-[var(--color-gray-100)] p-0 perspective-slab overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-stretch">
              {item.image && (
                <div className="relative h-48 w-full shrink-0 md:h-auto md:w-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 192px"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-center gap-4 p-9 md:flex-row md:items-center md:justify-between">
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
                <div className="flex flex-wrap items-center gap-4 shrink-0">
                  <Link href={item.href} className="link-underline text-sm">
                    See details
                  </Link>
                  {item.status === "coming-soon" ? (
                    <WaitlistButton source="coming-soon" variant="secondary">
                      sure i like you, add me
                    </WaitlistButton>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
