import { notFound } from "next/navigation";
import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// Flagship four. Stickers TBD (artist sourcing). T-shirt backend TBD (POD).
const products = {
  "wall-brush": {
    name: "The Wall Brush",
    tagline: "Offering",
    description:
      "Bubby's favorite wall brush. The one he uses. Same one. We don't know why he likes walls so much but he does, and now you can give your cat the exact brush that started this whole thing.",
    price: "$TBD", // TODO: set price
    materials: "TODO: add materials",
    care: "TODO: add care instructions",
    variants: ["One size"],
    colors: ["Natural"],
    specs: [
      "TODO: add specs",
    ],
    shipping: "Ships in 3–7 business days.",
    available: true,
  },
  "bubby-blanket": {
    name: "The Bubby Blanket",
    tagline: "Offering",
    description:
      "Bubby sleeps on this. Or something very close to it. We made one for you. It's soft. It does what blankets do. He approves.",
    price: "$TBD", // TODO: set price
    materials: "TODO: add materials",
    care: "TODO: add care instructions",
    variants: ["One size"],
    colors: ["TODO: add colors"],
    specs: [
      "TODO: add specs",
    ],
    shipping: "Ships in 3–7 business days.",
    available: true,
  },
  "sticker-sheet": {
    name: "The Sticker Sheet",
    tagline: "Coming Soon",
    description:
      "Artist is being sourced. These will be good. Worth the wait. We'll let you know.",
    price: "TBD",
    materials: "Matte vinyl",
    care: "Weather resistant",
    variants: ["One sheet"],
    colors: ["TBD"],
    specs: ["Matte finish", "Weather resistant"],
    shipping: "Available soon.",
    available: false,
  },
  "bubby-tee": {
    name: "The Bubby Tee",
    tagline: "Offering",
    description:
      "100% cotton. Bubby on it. Made specifically for you when you order — not sitting in a warehouse somewhere. We put exactly as much thought into the design as it deserved, which is to say: a lot.",
    price: "$28",
    materials: "100% cotton, pre-shrunk",
    care: "Machine wash cold, tumble dry low",
    variants: ["Small", "Medium", "Large", "XL", "2XL"],
    colors: ["Bone", "Stone", "Soft Black"],
    specs: ["100% cotton", "Pre-shrunk", "Machine wash cold", "Unisex fit"],
    shipping: "Made for you when you order. Ships in 5–10 business days.",
    available: true,
  },
};

const alsoLikes = [
  { name: "The Wall Brush", href: "/product/wall-brush" },
  { name: "The Bubby Blanket", href: "/product/bubby-blanket" },
  { name: "The Sticker Sheet", href: "/product/sticker-sheet" },
  { name: "The Bubby Tee", href: "/product/bubby-tee" },
];

type ProductPageProps = {
  params: { handle: string } | Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const product = products[resolvedParams.handle as keyof typeof products];

  if (!product) {
    notFound();
  }

  const otherProducts = alsoLikes
    .filter((p) => p.href !== `/product/${resolvedParams.handle}`)
    .slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      <Blob
        className="blob-slow left-[-80px] top-20 h-72 w-72"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #fff4cc, #ffe5ec 60%, #fefefe 100%)",
        }}
      />
      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Images */}
          <div className="grid gap-5">
            <div className="soft-card bg-[var(--color-gray-100)] p-6 perspective-slab">
              {/* TODO: replace with real product image */}
              <div className="aspect-square rounded-2xl bg-[var(--color-gray-500)]/10" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl bg-[var(--color-gray-500)]/10"
                />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="soft-card bg-[var(--color-peach)]/60 p-5 tilt-left">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Materials
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {product.materials}
                </p>
              </div>
              <div className="soft-card bg-[var(--color-mint)]/70 p-5 tilt-right">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Care
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {product.care}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                {product.tagline}
              </p>
              <h1 className="font-display text-4xl">{product.name}</h1>
              <p className="mt-3 text-base text-[var(--color-gray-500)]">
                {product.description}
              </p>
            </div>

            {!product.available ? (
              <p className="text-sm text-[var(--color-gray-500)]">
                Not available yet. Check back soon or{" "}
                <Link href="/contact" className="link-underline">
                  get in touch
                </Link>{" "}
                if you want to know when it drops.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold">{product.price}</span>
                </div>
                <div className="grid gap-4">
                  {product.variants.length > 1 && (
                    <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                      Size
                      <select className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]">
                        {product.variants.map((variant) => (
                          <option key={variant}>{variant}</option>
                        ))}
                      </select>
                    </label>
                  )}
                  {product.colors.length > 1 && (
                    <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                      Color
                      <select className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]">
                        {product.colors.map((color) => (
                          <option key={color}>{color}</option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
                    Quantity
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="h-10 w-10 rounded-full border border-[var(--color-gray-100)] text-lg text-[var(--color-gray-500)]"
                      >
                        -
                      </button>
                      <span className="text-sm text-[var(--color-charcoal)]">1</span>
                      <button
                        type="button"
                        className="h-10 w-10 rounded-full border border-[var(--color-gray-100)] text-lg text-[var(--color-gray-500)]"
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>
                <div className="flex flex-wrap gap-4">
                  {/* TODO: wire Get One to cart/checkout */}
                  <Button>Get One</Button>
                  <Button variant="secondary" href="/available">
                    Back to offerings
                  </Button>
                </div>
                <div className="grid gap-3 text-xs text-[var(--color-gray-500)]">
                  <p>{product.shipping}</p>
                  <p>
                    Something wrong?{" "}
                    <Link href="/contact" className="link-underline">
                      Let us know.
                    </Link>
                  </p>
                </div>
              </>
            )}

            <Card className="bg-[var(--color-gray-100)] perspective-slab">
              <h3 className="font-display text-lg">Specifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-gray-500)]">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {otherProducts.length > 0 && (
        <section className="page-shell section-pad">
          <h2 className="font-display text-2xl">Other things Bubby likes</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {otherProducts.map((p) => (
              <Link key={p.href} href={p.href} className="text-sm link-underline">
                {p.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
