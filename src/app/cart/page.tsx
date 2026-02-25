import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const hasItems = false;

  return (
    <div className="page-shell section-pad-lg">
      <h1 className="font-display text-4xl">Your Cart</h1>
      {hasItems ? (
        <div className="mt-8 grid gap-6">
          <div className="soft-card bg-[var(--color-gray-100)] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
              Here&apos;s what you&apos;re getting
            </p>
            {/* Line items go here */}
          </div>
          <div className="soft-card bg-[var(--color-gray-100)] p-6">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Subtotal</span>
                <span>—</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-gray-500)]">Shipping</span>
                <span className="text-[var(--color-gray-500)]">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--color-gray-200)] pt-3 font-semibold">
                <span>Total</span>
                <span>—</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button>Proceed I Guess</Button>
            <Link href="/available" className="text-sm link-underline self-center">
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
