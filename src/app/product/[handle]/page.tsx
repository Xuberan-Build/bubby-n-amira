import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCart from "@/components/product/AddToCart";
import ProductGallery from "@/components/product/ProductGallery";
import ProductUnavailable from "@/components/product/ProductUnavailable";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import { getProductByHandle, formatPrice } from "@/lib/shopify";
import {
  products as catalog,
  getProduct,
  getShopifyHandle,
  getLocalImages,
  shopifyOnlineStoreUrl,
} from "@/lib/products";

type ProductPageProps = {
  params: { handle: string } | Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await Promise.resolve(params);
  const shopifyHandle = getShopifyHandle(handle);
  const meta = getProduct(handle);

  // Shopify is fetched at request time, so a published→unpublished flip, a
  // handle change, or a Storefront API error would otherwise dead-end the
  // buyer on a 404/500. Recover into a page that still lets them purchase
  // via the Shopify online store.
  let product = null;
  try {
    product = await getProductByHandle(shopifyHandle);
  } catch {
    product = null;
  }

  if (!product) {
    if (meta) {
      return (
        <ProductUnavailable
          name={meta.name}
          role={meta.role}
          buyUrl={shopifyOnlineStoreUrl(shopifyHandle)}
        />
      );
    }
    notFound();
  }

  const extra = {
    tagline: meta?.tagline ?? "Practice Equipment",
    materials: meta?.materials ?? "—",
    care: meta?.care ?? "—",
    specs: meta?.specs ?? [],
    shipping: meta?.shipping ?? "Ships in 3–7 business days.",
  };

  const variants = product.variants.edges.map((e) => e.node);
  const shopifyImages = product.images.edges.map((e) => e.node);
  const localSupplements = getLocalImages(handle).map((src) => ({ url: src, altText: null }));
  const images =
    shopifyImages.length > 0
      ? [...shopifyImages, ...localSupplements]
      : localSupplements;
  const available = variants.some((v) => v.availableForSale);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  const otherProducts = catalog
    .filter((p) => p.handle !== handle)
    .slice(0, 3);

  return (
    <div className="pb-24 lg:pb-0">
      {/* ── Main product grid ── */}
      <section className="page-shell section-pad">
        <div className="grid gap-px bg-[var(--color-gray-100)] border border-[var(--color-gray-100)] lg:grid-cols-[1.1fr_0.9fr]">

          {/* Image column */}
          <ProductGallery images={images} title={product.title} />

          {/* Details column */}
          <div className="bg-[var(--color-white)] px-10 py-12 flex flex-col gap-8">

            {/* Header */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-gray-500)] mb-3">
                {extra.tagline}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-light leading-snug">
                {product.title}
              </h1>
            </div>

            {/* CTA — kept directly under the title so the buy button stays above the fold */}
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

            {/* Description */}
            <div className="border-t border-[var(--color-gray-100)] pt-8">
              {product.descriptionHtml ? (
                <div
                  className="product-rte text-base leading-relaxed text-[var(--color-gray-500)]"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-base leading-relaxed text-[var(--color-gray-500)]">
                  {product.description}
                </p>
              )}
            </div>

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
