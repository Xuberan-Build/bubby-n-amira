import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/product/AddToCart";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import { getProductByHandle, formatPrice } from "@/lib/shopify";

const localImages: Record<string, string[]> = {
  "grooming-brush": ["/images/products/thewallbrush2.webp"],
  "bubby-blanket": [
    "/images/products/bubbyblanket1.webp",
    "/images/products/bubbyblanket2.webp",
  ],
  "bubby-tee": ["/images/products/bubbytshirt.webp"],
  "sticker-sheet": [],
};

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
  "grooming-brush": {
    tagline: "Practice Equipment",
    materials: "Self-cleaning bristles, cream finish",
    care: "Press button to release fur. Wipe clean.",
    specs: ["Self-cleaning button", "Steel bristles", "Cat-tested"],
    shipping: "Ships in 3–7 business days.",
  },
  "bubby-blanket": {
    tagline: "Practice Equipment",
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
    tagline: "Practice Equipment",
    materials: "100% ring-spun cotton, garment-dyed",
    care: "Machine wash cold inside out, tumble dry low",
    specs: ["100% ring-spun cotton", "Garment-dyed finish", "Relaxed unisex fit", "Machine wash cold"],
    shipping: "Made for you when you order. Ships in 5–10 business days.",
  },
};

const alsoLikes = [
  { name: "The Grooming Brush", href: "/product/grooming-brush" },
  { name: "The Bubby Blanket", href: "/product/bubby-blanket" },
  { name: "The Sticker Sheet", href: "/product/sticker-sheet" },
  { name: "The Bubby Tee", href: "/product/bubby-tee" },
];

type ProductPageProps = {
  params: { handle: string } | Promise<{ handle: string }>;
};

const shopifyHandleAliases: Record<string, string> = {
  "bubby-tee": "unisex-garment-dyed-t-shirt",
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await Promise.resolve(params);
  const shopifyHandle = shopifyHandleAliases[handle] ?? handle;
  const product = await getProductByHandle(shopifyHandle);

  if (!product) notFound();

  const extra = supplementary[handle] ?? {
    tagline: "Practice Equipment",
    materials: "—",
    care: "—",
    specs: [],
    shipping: "Ships in 3–7 business days.",
  };

  const variants = product.variants.edges.map((e) => e.node);
  const shopifyImages = product.images.edges.map((e) => e.node);
  const fallbacks = localImages[handle] ?? [];
  const localSupplements = fallbacks.map((src) => ({ url: src, altText: null }));
  const images =
    shopifyImages.length > 0
      ? [...shopifyImages, ...localSupplements]
      : localSupplements;
  const available = variants.some((v) => v.availableForSale);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  const otherProducts = alsoLikes
    .filter((p) => p.href !== `/product/${handle}`)
    .slice(0, 3);

  return (
    <div>
      {/* ── Main product grid ── */}
      <section className="page-shell section-pad">
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] lg:grid-cols-[1.1fr_0.9fr]">

          {/* Image column */}
          <div className="bg-[var(--color-white)]">
            {images[0] ? (
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={images[0].url}
                  alt={images[0].altText ?? product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-[var(--color-gray-100)]" />
            )}
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-px bg-[var(--color-gray-100)] border-t border-[var(--color-gray-100)]">
                {images.slice(1, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden">
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
          </div>

          {/* Details column */}
          <div className="bg-[var(--color-white)] px-10 py-12 flex flex-col gap-8">

            {/* Header */}
            <div className="border-b border-[var(--color-gray-100)] pb-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
                {extra.tagline}
              </p>
              <h1 className="font-display text-4xl font-light leading-snug mb-5">
                {product.title}
              </h1>
              <p className="text-base leading-relaxed text-[var(--color-gray-500)]">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            {!available ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-gray-500)]">
                  Not available yet. Join Bubby&apos;s waitlist and he might
                  tell you when it drops.
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
              <div className="space-y-6">
                <p className="font-display text-2xl font-light">{price}</p>
                <AddToCart variants={variants} options={product.options} />
                <div className="space-y-2 text-xs text-[var(--color-gray-500)]">
                  <p>{extra.shipping}</p>
                  <p>
                    Something wrong?{" "}
                    <Link href="/contact" className="link-underline">
                      Let us know.
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* Materials + Care */}
            <div className="grid grid-cols-2 gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)]">
              <div className="bg-[var(--color-peach)]/60 px-5 py-6 tilt-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gray-500)] mb-2">
                  Materials
                </p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  {extra.materials}
                </p>
              </div>
              <div className="bg-[var(--color-mint)]/70 px-5 py-6 tilt-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gray-500)] mb-2">
                  Care
                </p>
                <p className="text-sm text-[var(--color-gray-500)]">
                  {extra.care}
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="border border-[var(--color-gray-100)] px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-4">
                Specifications
              </p>
              <ul className="space-y-2">
                {extra.specs.map((spec) => (
                  <li key={spec} className="text-sm text-[var(--color-gray-500)] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-gray-500)] shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bubby's Recommendations ── */}
      {otherProducts.length > 0 && (
        <div className="border-t border-[var(--color-gray-100)]">
          <div className="page-shell py-14">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-2">
              Also approved by Bubby
            </p>
            <p className="font-display text-2xl font-light mb-8">
              He recommends these without being asked.
            </p>
            <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] md:grid-cols-3">
              {otherProducts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="bg-[var(--color-white)] px-6 py-8 flex items-center justify-between group hover:bg-[var(--color-gray-100)] transition-colors"
                >
                  <span className="font-display text-lg font-light">{p.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-gray-500)] group-hover:text-[var(--color-charcoal)] transition-colors">
                    View →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
