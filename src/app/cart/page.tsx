"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export default function CartPage() {
  const { cart, isLoading, updateLine, removeLine } = useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const hasItems = lines.length > 0;

  return (
    <div className="page-shell section-pad-lg">
      <h1 className="font-display text-4xl">Your Cart</h1>
      {hasItems ? (
        <div className="mt-8 grid gap-6">
          <div className="soft-card bg-[var(--color-gray-100)] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
              Here&apos;s what you&apos;re getting
            </p>
            <ul className="mt-4 grid gap-4">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div className="grid gap-1">
                    <p className="font-medium text-[var(--color-charcoal)]">
                      {line.merchandise.product.title}
                    </p>
                    {line.merchandise.title !== "Default Title" && (
                      <p className="text-xs text-[var(--color-gray-500)]">
                        {line.merchandise.title}
                      </p>
                    )}
                    <p className="text-xs text-[var(--color-gray-500)]">
                      {formatPrice(
                        line.merchandise.price.amount,
                        line.merchandise.price.currencyCode
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        line.quantity > 1
                          ? updateLine(line.id, line.quantity - 1)
                          : removeLine(line.id)
                      }
                      disabled={isLoading}
                      className="h-8 w-8 rounded-full border border-[var(--color-gray-200)] text-sm text-[var(--color-gray-500)] disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-sm">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateLine(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      className="h-8 w-8 rounded-full border border-[var(--color-gray-200)] text-sm text-[var(--color-gray-500)] disabled:opacity-50"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      disabled={isLoading}
                      className="ml-2 text-xs text-[var(--color-gray-500)] underline disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="soft-card bg-[var(--color-gray-100)] p-6">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Subtotal</span>
                <span>
                  {cart
                    ? formatPrice(
                        cart.cost.subtotalAmount.amount,
                        cart.cost.subtotalAmount.currencyCode
                      )
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Shipping</span>
                <span className="text-[var(--color-gray-500)]">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--color-gray-200)] pt-3 font-semibold">
                <span>Total</span>
                <span>
                  {cart
                    ? formatPrice(
                        cart.cost.totalAmount.amount,
                        cart.cost.totalAmount.currencyCode
                      )
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href={cart?.checkoutUrl}>Proceed I Guess</Button>
            <Link
              href="/available"
              className="text-sm link-underline self-center"
            >
              Keep looking
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 soft-card bg-[var(--color-gray-100)] p-10 text-center">
          <p className="text-sm text-[var(--color-gray-500)]">
            Your cart is empty. Cool.
          </p>
          <div className="mt-6">
            <Button href="/available">Keep looking</Button>
          </div>
        </div>
      )}
    </div>
  );
}
