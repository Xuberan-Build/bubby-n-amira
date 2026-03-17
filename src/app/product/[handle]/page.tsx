import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Blob from "@/components/ui/Blob";
import Card from "@/components/ui/Card";
import AddToCart from "@/components/product/AddToCart";
import Button from "@/components/ui/Button";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import { getProductByHandle, formatPrice } from "@/lib/shopify";

const localImages: Record<string, string[]> = {
  "wall-brush": ["/images/products/thewallbrush1.webp"],
  "bubby-blanket": [
    "/images/products/bubbyblanket1.webp",
    "/images/products/bubbyblanket2.webp",
  ],
  "bubby-tee": ["/images/products/bubbytshirt.webp"],
  "sticker-sheet": [],
};

// Supplementary copy that lives here (not in Shopify) — materials, care, specs, shipping
const supplementary: Record<
  string,
  {
    tagline: string;
    materials: string;
    care: string;
    specs: string[];
    shipping: string;
  }
> = {
  "wall-brush": {
    tagline: "Offering",
    materials: "Natural bristles, wooden handle",
    care: "Wipe clean with a damp cloth",
    specs: ["Natural bristles", "Wooden handle", "Cat-tested"],
    shipping: "Ships in 3–7 business days.",
  },
  "bubby-blanket": {
    tagline: "Offering",
    materials: "Soft fleece blend",
    care: "Machine wash cold, tumble dry low",
    specs: ["Fleece blend", "Generous size", "Cat-approved warmth"],
    shipping: "Ships in 3–7 business days.",
  },
  "sticker-sheet": {
    tagline: "Coming Soon",
    materials: "Matte vinyl",
    care: "Weather resistant",
    specs: ["Matte finish", "Weather resistant", "Multiple stickers per sheet"],
    shipping: "Available soon.",
  },
  "bubby-tee": {
    tagline: "Offering",
    materials: "100% cotton, pre-shrunk",
    care: "Machine wash cold, tumble dry low",
    specs: ["100% cotton", "Pre-shrunk", "Machine wash cold", "Unisex fit"],
    shipping: "Made for you when you order. Ships in 5–10 business days.",
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
  const { handle } = await Promise.resolve(params);
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const extra = supplementary[handle] ?? {
    tagline: "Offering",
    materials: "—",
    care: "—",
    specs: [],
    shipping: "Ships in 3–7 business days.",
  };

  const variants = product.variants.edges.map((e) => e.node);
  const shopifyImages = product.images.edges.map((e) => e.node);
  const fallbacks = localImages[handle] ?? [];
  const images = shopifyImages.length > 0
    ? shopifyImages
    : fallbacks.map((src) => ({ url: src, altText: null }));
  const available = variants.some((v) => v.availableForSale);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  const otherProducts = alsoLikes
    .filter((p) => p.href !== `/product/${handle}`)
    .slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      <Blob className="blob-slow left-[-80px] top-20 h-72 w-72" fill="#fff4cc" />
      <section className="page-shell section-pad-lg relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Images */}
          <div className="grid gap-5">
            <div className="soft-card bg-[var(--color-gray-100)] p-6 perspective-slab">
              {images[0] ? (
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={images[0].url}
                    alt={images[0].altText ?? product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-2xl bg-[var(--color-gray-500)]/10" />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="soft-card bg-[var(--color-peach)]/60 p-5 tilt-left">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Materials
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {extra.materials}
                </p>
              </div>
              <div className="soft-card bg-[var(--color-mint)]/70 p-5 tilt-right">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gray-500)]">
                  Care
                </p>
                <p className="mt-2 text-sm text-[var(--color-gray-500)]">
                  {extra.care}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gray-500)]">
                {extra.tagline}
              </p>
              <h1 className="font-display text-4xl">{product.title}</h1>
              <p className="mt-3 text-base text-[var(--color-gray-500)]">
                {product.description}
              </p>
            </div>

            {!available ? (
              <div className="grid gap-4">
                <p className="text-sm text-[var(--color-gray-500)]">
                  Not available yet. Join Bubby&apos;s waitlist and he might tell
                  you when it drops.
                </p>
                <div className="flex flex-wrap gap-4">
                  <WaitlistButton source="coming-soon">
                    sure i like you, add me
                  </WaitlistButton>
                  <Link href="/contact" className="text-sm link-underline self-center">
                    get in touch
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold">{price}</span>
                </div>

                <AddToCart variants={variants} options={product.options} />

                <div className="grid gap-3 text-xs text-[var(--color-gray-500)]">
                  <p>{extra.shipping}</p>
                  <p>
                    Something wrong?{" "}
                    <Link href="/contact" className="link-underline">
                      Let us know.
                    </Link>
                  </p>
                </div>
              </>
            )}

            {!available && (
              <Button variant="secondary" href="/available">
                Back to offerings
              </Button>
            )}

            <Card className="bg-[var(--color-gray-100)] perspective-slab">
              <h3 className="font-display text-lg">Specifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-gray-500)]">
                {extra.specs.map((spec) => (
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
