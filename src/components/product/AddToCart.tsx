"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import { useProductSelection } from "@/components/product/ProductSelection";
import type { ShopifyVariant } from "@/lib/shopify";

type Option = { name: string; values: string[] };

type AddToCartProps = {
  variants: ShopifyVariant[];
  options: Option[];
  // Option value -> CSS color; options whose values all have one render as
  // swatches instead of a dropdown.
  swatches?: Record<string, string>;
};

function findVariant(
  variants: ShopifyVariant[],
  selected: Record<string, string>
): ShopifyVariant | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((opt) => selected[opt.name] === opt.value)
  );
}

export default function AddToCart({ variants, options, swatches }: AddToCartProps) {
  const { addToCart, isLoading } = useCart();
  const [added, setAdded] = useState(false);

  const { selected, setOption } = useProductSelection();
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
        opt.values.length <= 1 ? null : swatches &&
          opt.values.every((v) => swatches[v]) ? (
          <div key={opt.name} className="grid gap-2 text-sm text-[var(--color-gray-500)]">
            <span>
              {opt.name}
              <span className="text-[var(--color-charcoal)]"> — {selected[opt.name]}</span>
            </span>
            <div role="radiogroup" aria-label={opt.name} className="flex flex-wrap gap-3">
              {opt.values.map((v) => {
                const isSelected = selected[opt.name] === v;
                return (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={v}
                    title={v}
                    onClick={() => setOption(opt.name, v)}
                    className={`h-9 w-9 rounded-full border border-[var(--color-gray-100)] ring-offset-2 transition-shadow ${
                      isSelected
                        ? "ring-2 ring-[var(--color-charcoal)]"
                        : "hover:ring-2 hover:ring-[var(--color-gray-100)]"
                    }`}
                    style={{ backgroundColor: swatches[v] }}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <label
            key={opt.name}
            className="grid gap-2 text-sm text-[var(--color-gray-500)]"
          >
            {opt.name}
            <select
              className="rounded-2xl border border-transparent bg-[var(--color-gray-100)] px-4 py-3 text-sm text-[var(--color-charcoal)]"
              value={selected[opt.name]}
              onChange={(e) => setOption(opt.name, e.target.value)}
            >
              {opt.values.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        )
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
