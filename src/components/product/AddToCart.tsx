"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import type { ShopifyVariant } from "@/lib/shopify";

type Option = { name: string; values: string[] };

type AddToCartProps = {
  variants: ShopifyVariant[];
  options: Option[];
};

function findVariant(
  variants: ShopifyVariant[],
  selected: Record<string, string>
): ShopifyVariant | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((opt) => selected[opt.name] === opt.value)
  );
}

export default function AddToCart({ variants, options }: AddToCartProps) {
  const { addToCart, isLoading } = useCart();
  const [added, setAdded] = useState(false);

  // Initialize with first value of each option
  const [selected, setSelected] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(options.map((o) => [o.name, o.values[0] ?? ""])) as Record<string, string>
  );
  const [quantity, setQuantity] = useState(1);

  const variant = findVariant(variants, selected);
  const available = variant?.availableForSale ?? false;
  const selectedPrice = variant
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: variant.price.currencyCode,
      }).format(parseFloat(variant.price.amount))
    : "";

  async function handleAddToCart() {
    if (!variant || !available) return;
    await addToCart(variant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
    <div className="grid gap-4">
      {options.map((opt) =>
        opt.values.length > 1 ? (
          <label
            key={opt.name}
            className="grid gap-2 text-sm text-[var(--color-gray-500)]"
          >
            {opt.name}
            <select
              className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]"
              value={selected[opt.name]}
              onChange={(e) =>
                setSelected((prev) => ({ ...prev, [opt.name]: e.target.value }))
              }
            >
              {opt.values.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        ) : null
      )}

      <label className="grid gap-2 text-sm text-[var(--color-gray-500)]">
        Quantity
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-10 w-10 rounded-full border border-[var(--color-gray-100)] text-lg text-[var(--color-gray-500)]"
          >
            -
          </button>
          <span className="text-sm text-[var(--color-charcoal)]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-10 w-10 rounded-full border border-[var(--color-gray-100)] text-lg text-[var(--color-gray-500)]"
          >
            +
          </button>
        </div>
      </label>

      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleAddToCart}
          disabled={!available || isLoading}
        >
          {isLoading ? "Adding…" : added ? "Added!" : "Get One"}
        </Button>
        <Button variant="secondary" href="/available">
          Back to offerings
        </Button>
      </div>
    </div>

      {/* Sticky mobile buy bar — keeps the buy action above the fold on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-[var(--color-gray-100)] bg-[var(--color-white)]/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <span className="font-display text-lg font-light">{selectedPrice}</span>
        <Button onClick={handleAddToCart} disabled={!available || isLoading}>
          {isLoading ? "Adding…" : added ? "Added!" : "Get One"}
        </Button>
      </div>
    </>
  );
}
